/**
 * @typedef {Object} StepMeta
 * @property {number} id
 * @property {string} friendlyname
 */

class FormMeta {
  constructor({ lastStep = Number(), steps = [] }) {
    this.lastStep = lastStep
    /** @type {StepMeta[]} */
    this.steps = steps
  }
}

export default FormMeta


