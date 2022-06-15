import { IWebhookConfig } from "../types"

export default function getShouldSaveProcessedData( receivingStepSlug: string, webhookConfig?: IWebhookConfig): boolean{
  const safeWebhookConfig = webhookConfig || {} as IWebhookConfig
  const triggers = safeWebhookConfig?.triggers || []
  const currentTrigger = triggers.find(trigger => trigger.slug === receivingStepSlug)
  if(!currentTrigger) return false
  return currentTrigger.saveProcessedData
}