import {IEngineResolvers} from "./interfaces/IEngine"


class SessionHandler{
  private resolvers
  constructor(resolver: IEngineResolvers){
    this.resolvers = resolver
  }

  createSession(){
    
  }

  setCurrentStep(){
    
  }

  changeCurrentFlow(){
    
  }
  
  addCompletedStep(){
    
  }
  
  completeExperience(){

  }
}

export default SessionHandler