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

/** @type {IFlowStepsListItem[]} */
exports.mediumFlowMetadataStepsList = [
  { position: 1, slug: "personal_data", friendlyName: "Vamos começar" },
  { position: 2, slug: "documents", friendlyName: "Documentos" },
  { position: 3, slug: "token", friendlyName: "Token" },
]

/** @type {IFireboltSession} */
exports.oneStepCompletedFlowDefault = {
  "sessionId": "mockSessionId1234-1",
  "experienceMetadata": {
    "name": "sample",
    "currentPosition": 2,
    "lastStepSlug": "bills",
  },
  "experienceState": {
    "currentFlow": "default",
    "currentStepSlug": "documents",
    "lastCompletedStepSlug": "personal_data",
    "completedExperience": false,
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
exports.twoStepsCompletedFlowDefault = {
  "sessionId": "mockSessionId1234-2",
  "experienceMetadata": {
    "name": "sample",
    "currentPosition": 3,
    "lastStepSlug": "bills",
  },
  "experienceState": {
    "currentFlow": "default",
    "currentStepSlug": "address",
    "lastCompletedStepSlug": "documents",
    "completedExperience": false,
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
exports.threeStepsCompletedFlowDefault = {
  "sessionId": "mockSessionId1234-3",
  "experienceMetadata": {
    "name": "sample",
    "currentPosition": 4,
    "lastStepSlug": "bills",
  },
  "experienceState": {
    "currentFlow": "default",
    "currentStepSlug": "bills",
    "lastCompletedStepSlug": "documents",
    "completedExperience": false,
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

/** @type {IFireboltSession} */
exports.oneStepCompletedFlowMedium = {
  "sessionId": "mockSessionId1234-b1",
  "experienceMetadata": {
    "name": "sample",
    "currentPosition": 2,
    "lastStepSlug": "token",
  },
  "experienceState": {
    "currentFlow": "medium",
    "currentStepSlug": "documents",
    "lastCompletedStepSlug": "personal_data",
    "completedExperience": false,
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
exports.twoStepsCompletedFlowMedium = {
  "sessionId": "mockSessionId1234-2",
  "experienceMetadata": {
    "name": "sample",
    "currentPosition": 3,
    "lastStepSlug": "token",
  },
  "experienceState": {
    "currentFlow": "medium",
    "currentStepSlug": "token",
    "lastCompletedStepSlug": "documents",
    "completedExperience": false,
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

exports.threeStepsCompletedVisualizingSecond = {
  // TODO: create mock threeStepsCompletedVisualizingSecond
}

exports.twoStepsCompletedVisualizingFirst = {
  // TODO: create mock twoStepsCompletedVisualizingFirst
}
