import { useState } from "react";

export default function useStates() {
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [formFlowHasBeenFinished, setFormFlowHasBeenFinished] = useState(false);

  return { isFormLoading, formFlowHasBeenFinished };
}
