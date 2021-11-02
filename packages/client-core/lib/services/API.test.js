import axios from "axios";
import APIService from "./API";

import startFormResponse from "./__mocks__/startFormResponse";
import nextStepFormResponse from "./__mocks__/nextStepFormResponse";
import previousStepFormResponse from "./__mocks__/previousStepFormResponse";

// todo - passar todos os requests, testa-los e error handling
// throw correct error on validation error
// throw correct error on connection error
// throw correct error on try to debug without debug mode

// validation error on next step

jest.mock("axios");

describe("Navigation requests receive correct data", () => {
  const serviceInstance = new APIService({
    formAccess: {
      root: "asdsf",
      formName: "ajshf",
    },
  });

  const expectedNewStep = expect.objectContaining({
    auth: expect.any(String),
    capturedData: expect.any(Object),
    meta: expect.objectContaining({
      lastStep: expect.any(Number),
      steps: expect.arrayContaining([
        expect.objectContaining({
          friendlyName: expect.any(String),
          position: expect.any(Number),
        }),
      ]),
    }),
    step: expect.objectContaining({
      webhookResult: expect.any(Object),
      data: expect.objectContaining({
        position: expect.any(Number),
        slug: expect.any(String),
        type: expect.any(String),
        friendlyName: expect.any(String),
      }),
    }),
  });

  test("start form return correct data", async () => {
    axios.get.mockResolvedValue({ data: startFormResponse });
    const response = await serviceInstance.getStartForm();
    expect(response).toEqual(expectedNewStep);
  });

  test("next step return correct data", async () => {
    axios.post.mockResolvedValue({ data: nextStepFormResponse });
    const response = await serviceInstance.getNextStep(
      "sessionKey",
      "personal_data",
      { name: "teste cenoura", email: "batata@teste.com" }
    );
    expect(response).toEqual(expectedNewStep);
  });

  test("previous step must return correct data", async () => {
    axios.get.mockResolvedValue({ data: previousStepFormResponse });
    const response = await serviceInstance.getPreviousStep(
      "sessionKey",
      "personal_data"
    );

    expect(response).toEqual(expectedNewStep);
  });

  test.todo("debug step must return correct data");

  // fix debug step
});
