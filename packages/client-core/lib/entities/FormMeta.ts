const FormItem = ({
  slug = String(),
  position = Number(),
  friendlyname = String(),
} = {}) => ({
  slug,
  friendlyName: friendlyname,
  position,
});

function FormMetadata({ lastStep = String(), forms = [] } = {}) {
  const safeFormsMeta = forms || []
  return {
    lastStep: lastStep,
    steps: safeFormsMeta.map((item) => FormItem(item)),
  };
}

export default FormMetadata;
