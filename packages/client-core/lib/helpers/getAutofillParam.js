export default function getAutofillParam() {
  const params = new URLSearchParams(window.location.search);
  const autoFillString = params.get("autofill");

  if (autoFillString) {
    return JSON.parse(window.atob(autoFillString));
  }
}
