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
  // local json, resover function or remote json (used on client)
  getFormJSONSchema: (experienceSlug: string) => Object | Object | 'remote';
}

interface ICreateEngineOptions {
  resolvers: IEngineResolvers;
  hooks?: IEngineHooks;
  addons?: any;
}