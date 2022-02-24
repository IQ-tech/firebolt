import { useState } from "react";

export default function useStates() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(true);
  const [formFlowHasBeenFinished, setFormFlowHasBeenFinished] = useState<boolean>(false);

  return {
    isFormLoading,
    setIsFormLoading,
    formFlowHasBeenFinished,
    setFormFlowHasBeenFinished,
  };
}
