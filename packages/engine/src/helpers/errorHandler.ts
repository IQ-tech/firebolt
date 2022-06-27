import EngineError from "../classes/EngineError"

export default function errorHandler(err): EngineError {
  return err instanceof EngineError
    ? err
    : new EngineError("externalError", err?.stack || JSON.stringify(err))
}
