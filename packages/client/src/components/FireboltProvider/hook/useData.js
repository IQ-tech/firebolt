import { useState } from "react";

const defaultStep = {
  slug: "",
  type: "",
  friendlyName: "",
  fields: [],
  webhookResult: {},
};

export default function useData() {
  const [currentStep, setCurrentStep] = useState(defaultStep);

  // holds the form data before updating state, this is used by the wizard in the beforeChangeStep callback
  const [stagedStep, setStagedStep] = useState();
  const [formflowMetadata, setFormFlowMetadata] = useState({
    steps: [],
    lastStep: null,
  });
  const [capturedData, setCapturedData] = useState({});
  // validation errors that come from firebolt api
  const [remoteValidationErrors, setRemoteValidationErrors] = useState([]);
  const [requestsMetadata, setRequestsMetadata] = useState({});
  const [lastVisitedStep, setLastVisitedStep] = useState({})
  const [formEndPayload, formEndPayload] = useState({}) //step, meta, capturedData

  return {
    currentStep,
    stagedStep,
    formflowMetadata,
    formCapturedData,
    remoteValidationErrors,
    requestsMetadata,
    lastVisitedStep
  };
}
