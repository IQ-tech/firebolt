import Engine from "./engine"

/**
 * funcionamento:
 * 
 * tem que validar o passo quando os dados chegarem no motor
 * salvar o progresso de um passo em um storage (localstorage, api, banco)
 * em seguida retorna o proximo passo;
 */




function createEngine(engineOptions: ICreateEngineOptions) {
  return new Engine(engineOptions)
}

// ----------------------------------

/* const fireboltEngine = createEngine()

// se não passar nada no parametro, ele roda o answer.proceed automaticamente
fireboltEngine.proceedHandler((answer) => {
  answer.proceed()
  answer.fieldError()
  answer.preventProceed()
  answer.changeTrack()
}) */



/* import {createEngine} from "firebolt-server" */



