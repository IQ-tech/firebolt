// import { FormPayload } from '../../../types';

// export default function processProperties(
//   properties: { [key: string]: any },
//   formPayload: FormPayload,
// ) {
//   return Object.keys(properties).reduce((acc, key: string) => {
//     const value = properties[key];
//     const referenceBase = 'field-value:';
//     const referenceAnotherField =
//       typeof value === 'string' && value.indexOf(referenceBase) === 0;

//     if (referenceAnotherField) {
//       const refFieldSlug = value.replace(referenceBase, '');
//       const hasRefField = Object.keys(formPayload).includes(refFieldSlug);
//       if (!hasRefField) return {...acc}
//       const referencedValue = formPayload[refFieldSlug];

//       return {
//         ...acc,
//         [key]: referencedValue,
//       };
//     } else {
//       return {
//         ...acc,
//         [key]: value,
//       };
//     }
//   }, {});
// }
