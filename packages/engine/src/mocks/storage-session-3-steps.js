/**
 * This case represents a session of the sample experience that:
 * - user has completed 2 steps from the 4 of the default flow 
 */

/**
 * @typedef {import('../types').IFireboltSession} IFireboltSession
 */

/**
 * @type {IFireboltSession}
 */
const mock = {
  "sessionId": "mockSessionId1234",
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

module.exports = mock
