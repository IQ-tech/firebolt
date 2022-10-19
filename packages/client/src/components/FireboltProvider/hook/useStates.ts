import { useState } from "react";

export default function useStates() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(true);
  const [formFlowHasBeenFinished, setFormFlowHasBeenFinished] = useState<boolean>(false);
  const [beforeProceedPayload, setBeforeProceedPayload] = useState<any>(null)

  return {
    isFormLoading,
    setIsFormLoading,
    formFlowHasBeenFinished,
    setFormFlowHasBeenFinished,
    beforeProceedPayload,
    setBeforeProceedPayload
  };
}
