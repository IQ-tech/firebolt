import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
} from "./interfaces/IEngine"
import { IExperienceJSONSchema, IStepJSON } from "./types"

import SessionHandler from "./SessionHandler"

// helpers
import computeExperienceMetadata from "./helpers/computeExperienceMetadata"
import validateStep from "./helpers/validateStep"
import { equals } from "ramda"

class Stepper {
  private experienceId: string
  private preDefinedJSONSchema?: IExperienceJSONSchema
  private resolvers: IEngineResolvers
  private session: SessionHandler

  constructor({
    experienceId,
    experienceJSONSchema,
    resolvers,
  }: ICreateEngineOptions) {
    this.experienceId = experienceId
    this.preDefinedJSONSchema = experienceJSONSchema
    this.resolvers = resolvers
    this.session = new SessionHandler(this.resolvers)
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema
    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  private getReceivingStepSlug({
    session,
    schema,
  }: {
    session: IFireboltSession | undefined
    schema: IExperienceJSONSchema
  }) {
    const firstStepDefaultFlow = (() => {
      const defaultFlow = schema.flows.find((f) => f.slug === "default")
      const firstStep = defaultFlow?.stepsSlugs[0]
      return schema.steps.find((step) => step.slug === firstStep)
    })()

    return session
      ? session.experienceState.visualizingStepSlug
      : firstStepDefaultFlow!.slug
  }

  // dado um slug de step, a função deve retornar o próximo
  private getReturningStepDefinition(
    stepSlug: string,
    schema: IExperienceJSONSchema,
    session?: IFireboltSession
  ) {
    const receivingFlowSlug = session?.experienceState.currentFlow || "default"
    const receivingFlow = schema.flows.find(
      (flow) => flow.slug === receivingFlowSlug
    )
    const receivingStepIndex = receivingFlow!.stepsSlugs.indexOf(stepSlug)
    const returningStepSlug = receivingFlow?.stepsSlugs[receivingStepIndex + 1]
    const returningStepDefinition = schema.steps.find(
      (step) => step.slug === returningStepSlug
    )
    return returningStepDefinition
  }

  /**
   * lida com dois casos de transição de experiencia:
   * Iniciando uma experiencia do zero (request sem session id)
   * resumindo uma sessão (somente sessionId)
   *  no caso de resumindo, retornamos o passo de acordo com o estado salvo
   */
  async start(
    payload?: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    const session = await this.session.getSessionFromStorage(payload?.sessionId)
    const schema = await this.getCorrectFormJSONSchema()

    const getStepFromSchema = (stepSlug: string) => {
      return schema.steps.find((step) => step.slug === stepSlug)
    }

    const getFirstStepDefaultFlow = () => {
      const defaultFlow = schema.flows.find((f) => f.slug === "default")
      const firstStep = defaultFlow?.stepsSlugs[0]
      return schema.steps.find((step) => step.slug === firstStep)
    }

    const stepToReturn = session
      ? getStepFromSchema(session.experienceState.visualizingStepSlug)
      : getFirstStepDefaultFlow()

    if (!stepToReturn) throw new Error("Step not found") // TODO: handle error

    const processedStepToReturn = stepToReturn // add plugins
    const computedMetadata = computeExperienceMetadata(schema, session)

    // processar o step to return (add metadata + plugins)
    const stepWithMetadata: IStepTransitionReturn = {
      sessionId: session?.sessionId || "",
      step: processedStepToReturn,
      capturedData: session?.steps || {},
      errors: {},
      webhookResult: {},
      experienceMetadata: computedMetadata,
    }

    return stepWithMetadata
  }

  async proceed(
    payload: IExperienceProceedPayload = {},
    decisionCB?: () => void
  ): Promise<IStepTransitionReturn> {
    /**
     * Todo
     * - process returning definition
     * - errors + validation
     * - group return formatting
     * - validate payload format
     * - decision callback
     * - experience hooks
     * - webhook call
     */

    // validate payload format
    const session = await this.session.getSessionFromStorage(payload?.sessionId)
    const schema = await this.getCorrectFormJSONSchema()
    const currentFlowSlug = session?.experienceState.currentFlow ?? "default"

    // descobrir o slug do receiving
    const receivingStepSlug = this.getReceivingStepSlug({ session, schema })
    const receivingStepDefinition = schema.steps.find(
      (step) => step.slug === receivingStepSlug
    ) as IStepJSON
    const isCustomStep = receivingStepDefinition?.type !== "form"
    const isFirstStep = !session
    const isAnAlreadyVisitedStep = Object.keys(session?.steps || []).includes(
      receivingStepSlug
    )
    const isFieldsValidationNeeded = (() => {
      if (isCustomStep) return false
      if (isAnAlreadyVisitedStep) {
        const storedReceivedStepPayload = session?.steps?.[receivingStepSlug]
        const paramReceivedStepPayload = payload.fields
        return !equals(storedReceivedStepPayload, paramReceivedStepPayload)
      }
      return true
    })()

    // TODO: alterar forma de guardar erros que ocorreram?????
    const validation = isFieldsValidationNeeded
      ? validateStep(payload?.fields, receivingStepDefinition)
      : { isValid: true, invalidFields: [] }

    const isStepFieldsValid =
      (isFieldsValidationNeeded && validation.isValid) ||
      !isFieldsValidationNeeded

    if (!isStepFieldsValid) {
      return {
        sessionId: "",
        experienceMetadata: computeExperienceMetadata(
          schema,
          this.session.current
        ),
        capturedData: this.session.current?.steps ?? {},
        step: receivingStepDefinition, // todo - add addons
        webhookResult: [],
        errors: validation,
      }
    }

    if (isFirstStep && isStepFieldsValid) {
      await this.session.createSession(schema, "default")
    }

    await this.session.addCompletedStep(receivingStepSlug, {
      fields: payload.fields,
    })

    const returningStepDefinition = this.getReturningStepDefinition(
      receivingStepSlug,
      schema,
      session
    )
    const isLastStepOfFlow = !returningStepDefinition

    if (isLastStepOfFlow) {
      await this.session.completeExperience()
      return {
        sessionId: this.session.current.sessionId,
        experienceMetadata: computeExperienceMetadata(
          schema,
          this.session.current
        ),
        capturedData: this.session.current?.steps ?? {},
        step: {} as IStepJSON,
        webhookResult: [],
        errors: "",
      }
    }

    const processedReturningStepDefinition = returningStepDefinition

    await this.session.setVisualizingStepSlug(returningStepDefinition.slug)
    return {
      sessionId: this.session.current.sessionId,
      experienceMetadata: computeExperienceMetadata(
        schema,
        this.session.current
      ),
      capturedData: this.session.current?.steps ?? {},
      step: processedReturningStepDefinition,
      webhookResult: [],
      errors: {},
    }
  }

  async goBackHandler(
    payload: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    // const schema = await this.getCorrectFormJSONSchema()
    // const session = await this.session.getSessionFromStorage(payload?.sessionId)
    // if (!session)
    //   throw new Error("Não pode voltar se estiver no primeiro passo") // TODO: TRATAR ERRO

    // const metadata = computeExperienceMetadata(schema, session)
    // const step = this.getStep(schema, metadata, "current")
    // await this.resolvers.setSession({
    //   sessionId: session.sessionId,
    //   experienceMetadata: metadata,
    //   steps: session.steps,
    //   experienceState: {} as IExperienceState,
    // })

    // return {
    //   sessionId: session.sessionId,
    //   experienceMetadata: metadata,
    //   capturedData: session.steps,
    //   webhookResult: {},
    //   errors: {},
    //   step,
    // }
    return {} as IStepTransitionReturn
  }

  async debugHandler(
    stepSlug: string
  ): Promise<void> /* Promise<IStepTransitionReturn>  */ {
    const JSONSchema = await this.getCorrectFormJSONSchema()
    const stepDefinition = JSONSchema.steps.find(
      (step) => step.slug === stepSlug
    )
    const metadata = computeExperienceMetadata(JSONSchema)
    /* const step = this.getStep(JSONSchema, metadata) */

    /*     return {
      sessionId: "",
      webhookResult: {},
      errors: {},
      step
    } */
  }

  uploadHandler() {
    return () => {}
  }
}

export default Stepper
