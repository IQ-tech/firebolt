export default function getAutofillParam() {
  const params = new URLSearchParams(window?.location?.search);
  let autoFillString = params.get("autofill");

  if (autoFillString) {
    autoFillString = window.atob(autoFillString);

    if(decodeURI(autoFillString) !== decodeURIComponent(autoFillString)) {
      autoFillString = decodeURIComponent(autoFillString);
    }

    return JSON.parse(autoFillString.replace(/'/g, '"'));
  }
}

//OLD function

// export default function getAutofillParam() {
//   const params = new URLSearchParams(window?.location?.search);
//   const autoFillString = params.get("autofill");

//   if (autoFillString) {
//     return JSON.parse(window.atob(autoFillString));
//   }
// }
