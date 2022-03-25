/**
 * This case represents a session of the sample experience that:
 * - user has completed 2 steps from the 4 of the default flow
 */

/**
 * @typedef {import('../interfaces/IEngine').IFireboltSession} IFireboltSession
 */

/**
 * @type {IFireboltSession}
 */
const mock = {
  "sessionId": "",
  "experienceMetadata": {
    "name": "sample",
    "currentFlow": "default",
    "currentStepSlug": "address",
    "currentPosition": "3",
    "lastStepSlug": "bills",
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
