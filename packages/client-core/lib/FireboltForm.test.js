import axios from "axios";
import FireboltForm from "./FireboltForm";

import { clearAllFormSessions } from "./helpers/session/clearFormSession";
import getFireboltLocalStorage from "./helpers/session/getFireboltLocalStorage";
import createFormSession from "./helpers/session/createFormSession";

import startFormResponse from "./__mocks__/startFormResponse";
import nextStepFormResponse from "./__mocks__/nextStepFormResponse";

jest.mock("axios");

describe("start form tests", () => {
  beforeAll(() => {
    clearAllFormSessions();
  });

  test("start form correctly creates session key on localStorage", async () => {
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

  test("start form uses session key already created on localstorage", async () => {
    axios.get.mockResolvedValue({ data: nextStepFormResponse });

    const formAccess = {
      root: "https://another-firebolt-api/",
      formName: "myCustomForm",
    };
    createFormSession(formAccess.formName, "myPreviousSessionAuthKey");

    const form = new FireboltForm(formAccess);
    await form.start();

    expect(axios.get).lastCalledWith(
      "https://another-firebolt-api/form/myCustomForm",
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer myPreviousSessionAuthKey",
        }),
      })
    );
  });

  test.todo("throw an error when providing invalid api access");


  test.todo("throw an error on try to debug a step without debug key");
});
