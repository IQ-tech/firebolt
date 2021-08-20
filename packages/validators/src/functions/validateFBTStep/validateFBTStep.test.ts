import validateFBTStep from './index';
import allRightFields from './mocks/all-right-fields';
import wrongFields from './mocks/wrong-fields';
import contextValidation from './mocks/context-validation';
import sourceFields from './mocks/source-field';
import conditionalFields from './mocks/conditional-fields';

describe('validate correctly the fields', () => {
  test('validateFBTStep works correctly with all valid firebolt step', () => {
    expect(
      validateFBTStep({
        stepFields: allRightFields.fields,
        formPayload: allRightFields.payload,
      }).isValid,
    ).toBeTruthy();
  });

  test('validateFBTStep works correctly with all wrong firebolt step', () => {
    expect(
      validateFBTStep({
        stepFields: wrongFields.fields,
        formPayload: wrongFields.payload,
      }).isValid,
    ).toBeFalsy();
  });
});

describe('Validate correctly based on platform context', () => {
  test('validateFBTStep client context', () => {
    expect(
      validateFBTStep({
        context: 'client',
        stepFields: contextValidation.fields,
        formPayload: contextValidation.payloadClient,
      }).isValid,
    ).toBeTruthy();
  });

  test('validateFBTStep server context', () => {
    expect(
      validateFBTStep({
        context: 'server',
        stepFields: contextValidation.fields,
        formPayload: contextValidation.payloadServer,
      }).isValid,
    ).toBeTruthy();
  });
});

describe('Validate correctly based on platform context', () => {
  test('validateFBTStep with fields relationships', () => {
    expect(
      validateFBTStep({
        stepFields: sourceFields.fields,
        formPayload: sourceFields.payload,
      }).isValid,
    ).toBeTruthy();
  });
});

describe('Validate correctly conditional fields', () => {
  test(`Conditional field must be ignored if field is hidden (form dont fulfill condition), 
      example: 'spouse_name' field, should be ignored (hidden) if user selected that he is single
    `, () => {
    expect(
      validateFBTStep({
        stepFields: conditionalFields.fields,
        formPayload: conditionalFields.ignoredConditionalField,
      }).isValid,
    ).toBeTruthy();
  });

  test('validate filled conditional field correctly', () => {
    expect(
      validateFBTStep({
        stepFields: conditionalFields.fields,
        formPayload: conditionalFields.validConditionalField,
      }).isValid,
    ).toBeTruthy();
  });

  test('validate invalid conditional field correctly', () => {
    expect(
      validateFBTStep({
        stepFields: conditionalFields.fields,
        formPayload: conditionalFields.invalidConditionalField,
      }).isValid,
    ).toBeFalsy();
  });
});
