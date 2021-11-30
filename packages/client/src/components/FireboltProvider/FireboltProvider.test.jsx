import * as axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";

import useFireboltProvider from "./hook";

jest.mock("axios");

describe("FireboltProvider component", () => {
  it('Deve setar o estado "isLoading" como "true" ao chamar a função "goNextStep"', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {} }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFireboltProvider({
        formAccess: {
          root: "http://api.com.br/",
          formName: "testing",
        },
      })
    );

    await waitForNextUpdate();
    expect(result.current.isFormLoading).toBe(false);

    act(() => {
      result.current.goNextStep();
    });
    expect(result.current.isFormLoading).toBe(true);
  });

  it('Deve setar o estado "isLoading" como "true" ao chamar a função "goPreviousStep"', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {} }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFireboltProvider({
        formAccess: {
          root: "http://api.com.br/",
          formName: "testing",
        },
      })
    );

    await waitForNextUpdate();
    expect(result.current.isFormLoading).toBe(false);

    act(() => {
      result.current.goPreviousStep();
    });

    await waitForNextUpdate();
    expect(result.current.isFormLoading).toBe(true);
  });

  it("Deve mostrar erro avisando que o debug-step só funciona quando o modo debug estiver habilitado", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {} }));
    global.window = Object.create(window);

    const url = "https://localhost:1234/?debug-step=1";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        search: "debug-step=1",
      },
    });

    const { result } = renderHook(() =>
      useFireboltProvider({
        formAccess: {
          root: "http://api.com.br/",
          formName: "testing",
        },
      })
    );

    expect(result.error).toEqual(
      Error("Debug step is only allowed on debug mode: debug 1")
    );
  });

  it("Deve fazer a requisição de debug ", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {} }));
    global.window = Object.create(window);

    const url = "https://localhost:1234/?debug-step=1";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        search: "debug-step=1",
      },
    });

    const apiRoot = "http://api.com.br";
    const formName = "testing";

    const { waitForNextUpdate } = renderHook(() =>
      useFireboltProvider({
        formAccess: {
          root: apiRoot,
          formName: formName,
        },
        debug: true,
      })
    );

    await waitForNextUpdate();

    expect(axios.get).toHaveBeenCalledWith(`${apiRoot}/debug/${formName}/1`);
  });
});

// se tiver with history, transição de passo deve mudar history e url
// check if set loading state while is transitioning step
