import axios from "axios";
import APIService from "./API";
import startFormResponse from "./__mocks__/startFormResponse";

// todo - passar todos os requests, testa-los e error handling



// receive correct data with mocked requests
// throw correct error on validation error
// throw correct error on connection error
// throw correct error on try to debug without debug mode

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
});
