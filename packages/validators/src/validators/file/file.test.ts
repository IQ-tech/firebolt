import isFileValid from './index';

describe.each([
  {
    file: {
      url: 'file.com.br',
      extension: 'jpeg',
      size: 10,
    },
    properties: {},
  },
  {
    file: {
      url: 'file.com.br',
      extension: 'jpeg',
      size: 200,
    },
    properties: {
      sizeLimit: 200,
    },
  },
  {
    file: {
      url: 'file.com.br',
      extension: 'pdf',
      size: 200,
    },
    properties: {
      allowedExtensions: ['pdf'],
      sizeLimit: 200,
    },
  },
  {
    file: {
      url: 'file.com.br',
      extension: 'png',
      size: 20,
    },
    properties: {
      allowedExtensions: ['pdf', 'jpeg', 'png'],
      sizeLimit: 200,
    },
  },
  {
    file: {
      url: 'file.com.br',
      extension: 'pdf',
      size: 20,
    },
    properties: {
      sizeLimit: 200,
    },
  },
])('File validation', ({ file, properties }) => {
  test(`File ${JSON.stringify(
    file,
  )} should pass on file validation (props: ${JSON.stringify(
    properties,
  )})`, () => {
    expect(isFileValid.run(file, properties).isValid).toBeTruthy();
  });
});

describe.each([
  {
    file: {
      url: '',
      extension: '',
      size: 0,
    },
    properties: {},
  },
  {
    file: {
      url: 'file.com.br',
      extension: '',
      size: 200000,
    },
    properties: {
      sizeLimit: 200,
    },
  },
  {
    file: {
      url: 'file.com.br',
      extension: 'pdf',
      size: 200,
    },
    properties: {
      allowedExtensions: ['jpeg'],
      sizeLimit: 200,
    },
  },
  {
    file: {
      url: 'file.com.br',
      extension: '',
      size: 20,
    },
    properties: {
      allowedExtensions: ['jpeg'],
      sizeLimit: 200,
    },
  },
  {
    file: {
      url: '',
      extension: 'pdf',
      size: 200000,
    },
    properties: {
      allowedExtensions: ['jpeg'],
      sizeLimit: 200,
    },
  },
])('invalid File validation', ({ file, properties }) => {
  test(`File ${JSON.stringify(
    file,
  )} should not pass on file validation (props: ${JSON.stringify(
    properties,
  )})`, () => {
    expect(isFileValid.run(file, properties).isValid).toBeFalsy();
  });
});
