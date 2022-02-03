export default function getAutofillParam() {
  const params = new URLSearchParams(window?.location?.search);
  let autoFillString = params.get("autofill");

  console.log('params', params)
  // console.log('href', window.location.href)
  console.log('autoFillString fora do if', autoFillString)

  if (autoFillString) {
    console.log('autoFillString dentro do if ', autoFillString)
    autoFillString = window.atob(autoFillString);

    console.log('autoFillString after atob', autoFillString)

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
