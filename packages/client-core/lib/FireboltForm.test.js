import axios from "axios";
import FireboltForm from "./FireboltForm";
import { clearAllFormSessions } from "./helpers/session/clearFormSession";
import getFireboltLocalStorage from "./helpers/session/getFireboltLocalStorage";

import startFormResponse from "./__mocks__/startFormResponse";

jest.mock("axios");

describe("start form tests", () => {
  test("start form create key on localStorage", async () => {
    axios.get.mockResolvedValue({ data: startFormResponse });

    const formName = "partnerFormPotato";
    clearAllFormSessions();

    const form = new FireboltForm({
      root: "https://my-firebolt-api/",
      formName,
    });

    // get first step
    await form.start();

    // storage test
    const fireboltLocalStorage = getFireboltLocalStorage();
    const keys = fireboltLocalStorage?.sessionKeys || {};
    const currentFormSession = keys?.[formName];

    expect(currentFormSession).toBeTruthy();
    expect(currentFormSession).toBe(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiI2NzkyMTQ0MC01ZDljLTQwMmUtYTI4Yi0wZjJkOGRkNjRiZjYiLCJpYXQiOjE2MzU4NzI4NTV9.7y5GR8_1acwQ5UdttHJK0_LIoMze4COpcwy6bs4ovH4"
    );
  });
  test.todo("throw an error when providing invalid api access");

  /* expect(axios.get).toBeCalledWith(
    "https://my-firebolt-api/form/partnerFormOne",
    expect.any(Object)
  ); */
  test.todo("throw an error on try to debug a step withou debug key");

  test.todo("start form uses session key already created on localstorage");
});
