import { useState } from "react";

const defaultStep = {
  data: {
    slug: "",
    type: "",
    friendlyName: "",
    fields: [],
  },
  position: 0,
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
  const [remoteErrors, setRemoteErrors] = useState([]);
  const [lastVisitedStep, setLastVisitedStep] = useState({});
  const [formEndPayload, setFormEndPayload] = useState({}); //step, meta, capturedData

  return {
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
  };
}