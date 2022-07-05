

//import stringLength from "./index"

// describe.each([
//   { value: 'cebola', maxLength: 7, minLength: 2 },
//   { value: 'a', maxLength: 1 },
//   { value: 'a', minLength: 1 },
//   { value: 'a', maxLength: 10, minLength: 1 },
//   { value: 'aa', maxLength: 10, minLength: 1 },
//   { value: 'Random johnson', maxLength: 20, minLength: 5 },
//   { value: 'test', equals: 4 },
// ])(
//   'This strings should pass on char number validation',
//   ({ value, maxLength, minLength, equals }) => {
//     test(`value ${value} with max length: ${maxLength} and min length: ${minLength}`, () => {
//       expect(
//        stringLength(value, {properties: {maxLength, minLength}, errorsMap:{}})
//       ).toBeTruthy();
//     });
//   },
// );

// /* describe.each([
//   { value: 'a', maxLength: 10, minLength: 5 },
//   { value: 'cebola', maxLength: 2, minLength: 1 },
//   { value: 'test', exact: 5 },
// ])(
//   'This strings should not pass on char number validation',
//   ({ value, maxLength, minLength, exact }) => {
//     test(`value ${value} with max length: ${maxLength} and min length: ${minLength}`, () => {
//       expect(
//         textCharsLength.run(value, {
//           maxValue: maxLength,
//           minValue: minLength,
//           exact
//         }).isValid,
//       ).toBeFalsy();
//     });
//   },
// ); */
