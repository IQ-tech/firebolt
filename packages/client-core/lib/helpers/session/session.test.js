import createFormSession from "./createFormSession";
import { clearFormSession, clearAllFormSessions } from "./clearFormSession";
import getFireboltLocalStorage from "./getFireboltLocalStorage";
import { LOCALSTORE_KEY } from "../../constants";

describe("something", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("createFormSession correctly create form session on storage", () => {
    createFormSession("partnerForm", "myAuthKey");
    const fireboltLocalStorage = JSON.parse(
      localStorage.getItem(LOCALSTORE_KEY) || {}
    );
    const fireboltFormKey = fireboltLocalStorage?.sessionKeys?.["partnerForm"];

    expect(fireboltFormKey).toBe("myAuthKey");
  });

  test("createFormSession creates multiple sessions", () => {
    createFormSession("partnerFormOne", "myAuthKey");
    createFormSession("partnerFormTwo", "myAuthKey2");
    createFormSession("partnerFormThree", "myAuthKey3");
    const fireboltLocalStorage = getFireboltLocalStorage();
    const formSessionsKeys = Object.keys(
      fireboltLocalStorage?.sessionKeys || {}
    );

    expect(formSessionsKeys.includes("partnerFormOne")).toBeTruthy();
    expect(formSessionsKeys.includes("partnerFormTwo")).toBeTruthy();
    expect(formSessionsKeys.includes("partnerFormThree")).toBeTruthy();
  });

  test("clearFormSession clear specific form key on storage", () => {
    // creating three form sessions
    createFormSession("partnerFormOne", "myAuthKey");
    createFormSession("partnerFormTwo", "myAuthKey2");
    createFormSession("partnerFormThree", "myAuthKey3");

    // Clear partnerFormTwoSession key
    clearFormSession("partnerformTwo");

    // test
    const fireboltLocalStorage = getFireboltLocalStorage();

    const formSessions = fireboltLocalStorage?.sessionKeys || {};
    const formSessionsKeys = Object.keys(formSessions);

    expect(formSessions["partnerFormOne"]).toBe("myAuthKey");
    expect(formSessions["partnerFormThree"]).toBe("myAuthKey3");
    expect(formSessionsKeys.includes("partnerformTwo")).toBeFalsy();
  });

  test("clear all form sessions work correctly", () => {
    createFormSession("partnerFormOne", "myAuthKey");
    createFormSession("partnerFormTwo", "myAuthKey2");
    createFormSession("partnerFormThree", "myAuthKey3");

    clearAllFormSessions();
    const fireboltLocalStorage = getFireboltLocalStorage();

    expect(Object.keys(fireboltLocalStorage).length).toBe(0);
  });
});
