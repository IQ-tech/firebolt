import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
  IExperienceMetadata,
  IExperienceState,
} from "./interfaces/IEngine"
import { IExperienceJSONSchema, IStepJSON } from "./types"
import { ValidateFBTStepResult } from "@iq-firebolt/validators"

import SessionHandler from "./SessionHandler"

import equals from "ramda/es/equals"

// helpers
import computeExperienceMetadata from "./helpers/computeExperienceMetadata"
import getHasFilledFields from "./helpers/getHasFilledFields"
import validateStep from "./helpers/validateStep"
import createExperience from "./helpers/createExperience"
import continueExperience from "./helpers/continueExperience"

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
      ? getStepFromSchema(session.experienceState.currentStepSlug)
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

  async proceed(
    payload: IExperienceProceedPayload = {},
    decisionCB?: () => void
  ): Promise<IStepTransitionReturn> {
    // validate payload format
    const session = await this.session.getSessionFromStorage(payload?.sessionId)
    const schema = await this.getCorrectFormJSONSchema()

    // descobrir o slug do receving
    const receivingStepSlug = this.getReceivingStepSlug({ session, schema })
    const receivingStepDefinition = schema.steps.find(
      (step) => step.slug === receivingStepSlug
    ) as IStepJSON
    const isCustomStep = receivingStepDefinition?.type !== "form"
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

    // alterar forma de guardar erros que ocorreram
    const isStepFieldsValid =
      (isFieldsValidationNeeded &&
        validateStep(payload?.fields, receivingStepDefinition).isValid) ||
      !isFieldsValidationNeeded

    if (!nextStepDefinition) throw new Error("Step not found") // TODO: add error

    const currentFlowSlug = session?.experienceState.currentFlow ?? "default"

    const isLastStep = this.isStepLast(
      schema,
      nextStepDefinition!.slug,
      currentFlowSlug
    )

    // verificar validação do step

    const sessionId = session
      ? session?.sessionId
      : await this.session.createSession(schema)

    const updatedSession = await this.session.getSessionFromStorage(sessionId)
    const validation = validateStep(payload?.fields, nextStepDefinition)
    const stepType = nextStepDefinition?.type
    const isStepValid =
      (stepType === "form" && validation.isValid) || stepType !== "form"

    if (!isStepValid) {
      const errors = !validation.isValid ? validation : []
      return {
        sessionId: sessionId,
        experienceMetadata: computeExperienceMetadata(schema, updatedSession),
        capturedData: session?.steps ?? {},
        step: nextStepDefinition,
        webhookResult: [],
        errors,
      }
    } else {
      // fazer transição
      this.session.addCompletedStep(nextStepDefinition.slug, {
        ...(payload?.fields || {}),
      })
      const stepToReturn = this.getNextStep(
        nextStepDefinition.slug,
        schema,
        session
      )

      if (!stepToReturn) throw new Error("step not found") // TODO: add error

      await this.session.updateCurrentStep(stepToReturn.slug)
      const newSession = this.session.current
      console.log("newSessionProceed: ", newSession) // TODO: REMOVE LOG
      const returnValue = {
        sessionId: sessionId,
        experienceMetadata: computeExperienceMetadata(schema, newSession),
        capturedData: newSession?.steps ?? {},
        step: stepToReturn,
        webhookResult: [],
        errors: {},
      }

      console.log("returnValue: ", returnValue) // TODO: REMOVE LOG

      return returnValue
    }

    const currentFlow = schema.flows.find((x) => x.slug === currentFlowSlug)
    // const session = await this.session.getSessionFromStorage(payload?.sessionId)
    // const hasFilledFields = getHasFilledFields(payload)
    // const schema = await this.getCorrectFormJSONSchema()

    // if (!session && !hasFilledFields) return createExperience(schema)
    // if (session && !hasFilledFields) return continueExperience(schema, session)

    // // identify Y
    // validate payload
    // if not session, create
    // decision callback
    // modify state
    // if lastStep, atualizar o completed
    // get nextStep
    // // modify return
    // apply metadata
    // apply props presets

    // return await this.saveExperience(schema, payload, session)
    return {} as IStepTransitionReturn
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  // dado um step x + session + schema, essa função retorna um bool se o passo e o ultimo
  private isStepLast(
    schema: IExperienceJSONSchema,
    stepSlug: string,
    flowSlug?: string
  ): boolean {
    const currentFlowSlug = flowSlug || "default"
    const currentFlow = schema.flows.find((f) => f.slug === currentFlowSlug)
    if (!currentFlow) throw new Error("Flow not found") // TODO: handle error

    const lastStepIndex = currentFlow?.stepsSlugs.length - 1
    const stepIndex = currentFlow?.stepsSlugs.indexOf(stepSlug)
    const currentStepIsLast = lastStepIndex === stepIndex

    return currentStepIsLast

    // Com a session da para fazer direto dessa forma:
    // return session.experienceMetadata.lastStepSlug === stepSlug
    // a lógica para chegar no lastStepSlug dentro do metadata é mesma utilizada aqui

    // Firebolt pode ter apenas 1 Step?
    // No payload do 1 step não teremos o session para fazer essa comparação.
  }

  // dado um slug de step, a função deve retornar o próximo
  private getNextStep(
    stepSlug: string,
    schema: IExperienceJSONSchema,
    session?: IFireboltSession
  ) {
    const currentFlowSlug = session?.experienceState.currentFlow || "default"
    const currentFlow = schema.flows.find(
      (flow) => flow.slug === currentFlowSlug
    )
    const currentStepIndex = currentFlow!.stepsSlugs.indexOf(stepSlug)
    const nextStepSlug = currentFlow?.stepsSlugs[currentStepIndex + 1]
    const nextStepDefinition = schema.steps.find(
      (step) => step.slug === nextStepSlug
    )
    return nextStepDefinition
  }

  private async saveExperience(
    schema: IExperienceJSONSchema,
    payload?: IExperienceProceedPayload,
    session?: IFireboltSession
  ): Promise<IStepTransitionReturn> {
    // if (!payload?.sessionId) throw new Error("SessionId not found") // TODO: TRATAR ERRO

    // const metadata = computeExperienceMetadata(schema, session)
    // const currentStepJSON = schema.steps.find(
    //   (x) => x.slug === metadata.currentStepSlug
    // )
    // const stepType = currentStepJSON?.type
    // if (!currentStepJSON) throw new Error("Step not found") // TODO: TRATAR ERRO

    // const validation = validateStep(payload?.fields, currentStepJSON)
    // if (!validation.isValid && stepType !== "custom") {
    //   const errors = !validation.isValid ? validation : []
    //   return {
    //     sessionId: payload?.sessionId,
    //     experienceMetadata: metadata,
    //     capturedData: session?.steps ?? {},
    //     step: currentStepJSON,
    //     webhookResult: [],
    //     errors,
    //   }
    // }

    // // TODO: IMPLEMENTAR WEBHOOKS AQUI OU FORA????

    // const newSession: IFireboltSession = {
    //   sessionId: payload?.sessionId ?? session!.sessionId,
    //   experienceMetadata: metadata,
    //   steps: {
    //     ...session?.steps,
    //     [metadata.currentStepSlug]: { ...payload?.fields },
    //   },
    // }

    // await this.resolvers.setSession(newSession)
    // const newMetadata = computeExperienceMetadata(schema, newSession)
    // const step = this.getStep(schema, newMetadata, "next")

    // return {
    //   sessionId: payload!.sessionId,
    //   errors: {},
    //   experienceMetadata: newMetadata,
    //   webhookResult: {},
    //   step,
    //   capturedData: newSession.steps,
    // }

    return {} as IStepTransitionReturn
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
