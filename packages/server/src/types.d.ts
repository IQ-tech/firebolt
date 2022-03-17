interface IPropsPresetCollection {
  name: string
  presets: {
    [key: string]: any
  }
};
interface IAddonsConfig {
  uiPropsPresets?: IPropsPresetCollection[] 
}

interface IEngineHooks {
  onBeforeCallWebhook?: () => void;
  onGetWebookResponse?: () => void;
  onProceedStep?: () => void;
  onGoBackStep?: () => void;
}

interface IEngineResolvers {
  getFormJSONSchema: (experienceSlug: string) => Object; // or formJSONSchema
  

}

interface ICreateEngineOptions {
  resolvers: IEngineResolvers;
  formJSONSchema?: Object; // or dynamic find handler
  hooks?: IEngineHooks;
  addons?: any;
}