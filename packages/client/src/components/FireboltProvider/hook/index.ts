import { useEffect, useMemo } from "react"
import { createFireboltForm } from "@iq-firebolt/client-core/lib"
import getDebugStepName from "../../../helpers/getDebugStepName"

import useStates from "./useStates"
import useData from "./useData"
import useBrowserNavigation from "./useBrowserNavigation"
import { IFireboltProvider, IFieldsObject } from "../../../types"
import { IRequestMetadata } from "@iq-firebolt/client-core/lib"

function useFireboltProvider({
  formAccess,
  debug,
  requestsMetadata = {},
  theme,
  withHistory,
  stepQueryParam = "step",
  addons = {},
  mockStep,
}: IFireboltProvider) {
  const formEngine = useMemo(
    () =>
      createFireboltForm(formAccess, {
        requestsMetadata,
        debug,
        addons,
        mockStep,
      }),
    []
  )

  const {
    isFormLoading,
    setIsFormLoading,
    formFlowHasBeenFinished,
    setFormFlowHasBeenFinished,
  } = useStates()

  const {
    capturedData,
    setCapturedData,
    remoteErrors,
    setRemoteErrors,
    formflowMetadata,
    setFormFlowMetadata,
    formEndPayload,
    setFormEndPayload,
    currentStep,
    setCurrentStep,
    stagedStep,
    setStagedStep,
    lastVisitedStep,
    setLastVisitedStep,
    clearRemoteFieldError
  } = useData()

  useBrowserNavigation({
    withHistory,
    currentStep,
    formflowMetadata,
    goPreviousStep,
    goNextStep,
    stepQueryParam,
    debug,
  })

  useEffect(() => {
    const debugStep = getDebugStepName()
    if (!!debugStep) {
      if (!debug)
        throw new Error(
          `Debug step is only allowed on debug mode: debug ${debugStep}`
        )
      _startDebugStep(debugStep)
    } else {
      _startForm()
    }
  }, [])

  function _startForm() {
    setIsFormLoading(true)
    formEngine
      .start()
      .then((data) => {
        setIsFormLoading(false)
        setCurrentStep(data.step)
        setCapturedData(data.capturedData)
        setFormFlowMetadata(data.meta)
      })
      .catch(_handleTransitionError)
  }

  function _startDebugStep(stepSlug: string) {
    setIsFormLoading(true)
    return formEngine.debugStep(stepSlug).then((data) => {
      setIsFormLoading(false)
      setCurrentStep(data.step)
      setCapturedData(data.capturedData)
      setFormFlowMetadata(data.meta)
    })
  }

  function goNextStep(
    stepFieldsPayload?: IFieldsObject,
    { extraRequestsMetaData = {} }: IRequestMetadata = {}
  ): Promise<void | Object> {
    setIsFormLoading(true)
    const isLastStep = currentStep?.data?.slug === formflowMetadata?.lastStep
    return formEngine
      .nextStep(currentStep.data.slug, stepFieldsPayload, {
        extraRequestsMetaData,
      })
      .then((data) => {
        if (isLastStep) {
          setFormEndPayload({
            webhookResult: data?.step?.webhookResult,
            capturedData: data?.capturedData,
          })
          setFormFlowHasBeenFinished(true)
          clearSession()
        } else {
          setCapturedData(data.capturedData)
          setStagedStep(data?.step)
          setFormFlowMetadata(data.meta)
        }
      })
      .catch((err) => _handleTransitionError(err, stepFieldsPayload))
  }

  function goPreviousStep(): Promise<void | Object> {
    setIsFormLoading(true)
    return formEngine
      .previousStep(currentStep.data.slug)
      .then((data) => {
        setCapturedData(data.capturedData)
        setStagedStep(data.step)
        setFormFlowMetadata(data.meta)
      })
      .catch(_handleTransitionError)
  }

  function commitStepChange(): void {
    setLastVisitedStep(currentStep)
    setCurrentStep(stagedStep)
    setStagedStep(null)
    setIsFormLoading(false)
    setRemoteErrors([])
  }

  function addRequestsMetadata(key: string, data: Object = {}): void {
    formEngine.addRequestMetadataItem(key, data)
  }
  function removeRequestsMetadata(key: string): void {
    formEngine.removeRequestMetadataItem(key)
  }

  function getRequestsMetadata(): Object {
    return formEngine.requestsMetadata
  }

  function clearSession(): void {
    formEngine.clearSession()
  }

  function _handleTransitionError(
    err: {
      response: {
        data: { errorData: { invalidFields: Object[] } }
        status: number
      }
    },
    fillData?: IFieldsObject
  ) {
    const invalidFields = err?.response?.data?.errorData?.invalidFields || []
    const isValidationError =
      err?.response?.status === 400 && !!invalidFields.length
    if (isValidationError) {
      setRemoteErrors(invalidFields)

      if (fillData) {
        const safeFields = currentStep?.data?.fields || []
        const newFilledStepFields = safeFields.map((field) => ({
          ...field,
          value: fillData[field?.slug],
        }))
        const newCurrentStep = {
          ...currentStep,
          data: { ...currentStep?.data, fields: newFilledStepFields },
        }
        setCurrentStep(newCurrentStep)
      }
      setIsFormLoading(false)

      return { errors: invalidFields }
    }
  }

  function uploadFile(file, fileName: string) {
    return formEngine.uploadFile(file, fileName)
  }

  return {
    //states
    isFormLoading,
    formFlowHasBeenFinished,
    //data
    currentStep,
    stagedStep,
    formflowMetadata,
    capturedData,
    formEndPayload,
    lastVisitedStep,
    remoteErrors,
    theme, //todo
    // methods
    goNextStep,
    goPreviousStep,
    commitStepChange,
    addRequestsMetadata,
    removeRequestsMetadata,
    getRequestsMetadata,
    uploadFile,
    clearSession,
    clearRemoteFieldError
  }
}

export default useFireboltProvider
