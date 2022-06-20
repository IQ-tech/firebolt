export default function getDebugStepName() {
  const params = new URLSearchParams(window.location.search);
  const stepToDebug = params.get("debug-step") || '';
  return stepToDebug;
}
