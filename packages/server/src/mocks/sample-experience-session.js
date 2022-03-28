/**
 * @typedef {import('../interfaces/IEngine').IFireboltSession} IFireboltSession
 * @typedef {import("../interfaces/IEngine").IFlowStepsListItem} IFlowStepsListItem
 */

/** @type {IFlowStepsListItem[]} */
exports.defaultFlowMetadataStepsList = [
  { position: 1, slug: "personal_data", friendlyName: "Vamos começar" },
  { position: 2, slug: "documents", friendlyName: "Documentos" },
  { position: 3, slug: "address", friendlyName: "Endereço" },
  { position: 4, slug: "bills", friendlyName: "Adicionar Contas" },
]

/** @type {IFireboltSession} */
exports.oneStepCompleted = {
  "sessionId": "mockSessionId1234-1",
  "experienceMetadata": {
    "name": "sample",
    "currentFlow": "default",
    "currentStepSlug": "documents",
    "currentPosition": 2,
    "lastStepSlug": "bills",
    "lastCompletedStepSlug": "personal_data",
  },
  "steps": {
    "personal_data": {
      "fields": {
        "full_name": "Teste Cenoura",
        "email": "teste@cenoura.com",
      },
    },
  },
}

/** @type {IFireboltSession} */
exports.twoStepsCompleted = {
  "sessionId": "mockSessionId1234-2",
  "experienceMetadata": {
    "name": "sample",
    "currentFlow": "default",
    "currentStepSlug": "address",
    "currentPosition": 3,
    "lastStepSlug": "bills",
    "lastCompletedStepSlug": "documents",
  },
  "steps": {
    "personal_data": {
      "fields": {
        "full_name": "Teste Cenoura",
        "email": "teste@cenoura.com",
      },
    },
    "documents": {
      "fields": {
        "brazil_id_number": "asdsf23s",
      },
    },
  },
}

/**
 * @type {IFireboltSession}
 */
exports.threeStepsCompleted = {
  "sessionId": "mockSessionId1234-3",
  "experienceMetadata": {
    "name": "sample",
    "currentFlow": "default",
    "currentStepSlug": "bills",
    "currentPosition": 4,
    "lastStepSlug": "bills",
    "lastCompletedStepSlug": "documents",
  },
  "steps": {
    "personal_data": {
      "fields": {
        "full_name": "Teste Cenoura",
        "email": "teste@cenoura.com",
      },
    },
    "documents": {
      "fields": {
        "brazil_id_number": "asdsf23s",
      },
    },
    "address": {
      "fields": {
        "zipcode": "13224-430",
        "street_address": "Rua Alguma coisa de Algum lugar",
        "street_number": "123",
        "additional_info": "",
        "neighborhood": "bairro das batatas",
        "city": "Tangamandapio",
        "state": "SP",
      },
    },
  },
}

exports.threeStepsCompletedVisualizingSecond = {
  //todo
}

exports.twoStepsCompletedVisualizingFirst = {
  //todo
}
