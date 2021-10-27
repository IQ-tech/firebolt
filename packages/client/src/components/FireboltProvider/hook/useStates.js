export default function useState() {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formFlowHasBeenFinished, setFormFlowHasBeenFinished] = useState(false);

  return { isFormLoading, formFlowHasBeenFinished };
}
