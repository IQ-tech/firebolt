import axios from "axios";
import APIService from "./API";

// receive correct data with mocked requests
// throw correct error on validation error
// throw correct error on connection error
// throw correct error on try to debug without debug mode

jest.mock('axios');

describe("Navigation requests receive correct data", () => {
  const serviceInstance = new APIService({
    formAccess: {
      root: "asdsf",
      formName: "ajshf",
    },
  });

  test("start form return correct data", async () => {
    axios.get.mockResolvedValue({
      data: {
        teste: "cenoura",
      },
    });

    const a = await serviceInstance.getStartForm();

    expect(a.teste).toBe("teste")
  });
});
