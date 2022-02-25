import { renderHook, act } from "@testing-library/react-hooks"

import useFireboltProvider from "./hook"

const formAccess = {
  root: "http://api.com.br/",
  formName: "testing",
}

describe("FireboltProvider component", () => {
  it('Deve setar o estado "isLoading" como "true" ao chamar a função "goNextStep"', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFireboltProvider({
        formAccess,
      })
    )

    await waitForNextUpdate()
    expect(result.current.isFormLoading).toBe(false)

    act(() => {
      result.current.goNextStep("")
    })

    await waitForNextUpdate()

    expect(result.current.isFormLoading).toBe(true)
  })

  it('Deve setar o estado "isLoading" como "true" ao chamar a função "goPreviousStep"', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFireboltProvider({
        formAccess,
      })
    )

    await waitForNextUpdate()
    expect(result.current.isFormLoading).toBe(false)

    act(() => {
      result.current.goPreviousStep()
    })

    await waitForNextUpdate()
    expect(result.current.isFormLoading).toBe(true)
  })

  it("Deve fazer a transição de step após chamar a função commitStepChange", async () => {
    const secondStepData = [
      {
        slug: "email",
        "ui:props": { label: "Email", placeholder: "contato@email.com" },
        "ui:widget": "Email",
      },
    ]

    const { result, waitForNextUpdate } = renderHook(() =>
      useFireboltProvider({
        formAccess,
      })
    )

    expect(result.current.isFormLoading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.isFormLoading).toBe(false)

    act(() => {
      result.current.goNextStep("")
    })

    await waitForNextUpdate()
    expect(result.current.stagedStep.data.fields).toEqual(secondStepData)

    act(() => {
      result.current.commitStepChange()
    })

    expect(result.current.stagedStep).toEqual(null)
    expect(result.current.currentStep.data.fields).toEqual(secondStepData)
  })
})

describe("FireboltProvider component - testes relacionados ao modo de debug", () => {
  beforeEach(() => {
    global.window = Object.create(window)

    const url = "https://localhost:1234/?debug-step=personal_data"
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        search: "debug-step=personal_data",
      },
    })
  })

  it("Deve mostrar erro avisando que o debug-step só funciona quando o modo debug estiver habilitado", async () => {
    const { result } = renderHook(() =>
      useFireboltProvider({
        formAccess,
      })
    )

    expect(result.error).toEqual(
      Error("Debug step is only allowed on debug mode: debug personal_data")
    )
  })

  it("Deve fazer a requisição de debug", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFireboltProvider({
        formAccess,
        debug: true,
      })
    )

    await waitForNextUpdate()

    expect(result.current.currentStep.data.friendlyName).toBe(
      "Debug - Documentos"
    )
  })

  it.todo("to test addons")
  // TODO: TEST
})
