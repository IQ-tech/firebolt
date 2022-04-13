import {
  IDecisionCreator,
  IExperienceDecision,
  IExperienceDecisionCallbackFunction,
  IExperienceDecisionPayload,
} from "../interfaces/IEngine"

import StepperEngine from "../Stepper"

/**
 * funcionamento:
 *
 * tem que validar o passo quando os dados chegarem no motor
 * salvar o progresso de um passo em um storage (localstorage, api, banco)
 * em seguida retorna o proximo passo;
 */

/**
 * duvidas:
 *
 * - como lidar com a chamada de webhook, o fetch deve ficar dentro do pacote ou não?
 *
 * - podemos unificar a next e a start como uma rota só?
 */

/**
 * certezas:
 *
 *  - a engine deve ter um slug para cada tipo de erro, o conector deve identificar qual é
 * esse erro e como ele deve ser tratado
 *
 */

const engine = new StepperEngine({
  experienceId: "test",
  resolvers: {
    getSession: async () => undefined,
    setSession: async () => undefined,
  },
})

const decisionCallback: IExperienceDecisionCallbackFunction = async (
  decisionPayload: IExperienceDecisionPayload,
  decision: IDecisionCreator
): Promise<IExperienceDecision> => {
  const { receivingStepData } = decisionPayload

  if (receivingStepData.fields?.hasUser) {
    const userInfo = await fetch("teste/teste", receivingStepData.fields?.cpf)
    decision("changeFlow", {
      autofill: { ...userInfo.personalData },
    })
  }
}

// rodar entre validação de passo e alteração de estado
engine.proceed({}, (decide, s) => {
  decide("changeFlow", { errors: {} })
})

// ----------------------------------

// uso com express

// uso com serverless

// uso com browser
