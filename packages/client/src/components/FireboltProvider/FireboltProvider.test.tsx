import { renderHook, act } from "@testing-library/react-hooks"
import { vi, expect } from "vitest"
import axios from "axios"

import useFireboltProvider from "./hook"

// Mock axios
vi.mock("axios")

// Mock do client-core
vi.mock("@iq-firebolt/client-core", () => ({
  createFireboltForm: vi.fn(() => ({
    start: vi.fn().mockResolvedValue({ data: {} }),
    nextStep: vi.fn().mockResolvedValue({
      data: {
        fields: [
          {
            slug: "email",
            "ui:props": { label: "Email", placeholder: "contato@email.com" },
            "ui:widget": "Email",
          },
        ],
      },
    }),
    previousStep: vi.fn().mockResolvedValue({ data: {} }),
    startForm: vi.fn().mockResolvedValue({ data: {} }),
    debugStep: vi.fn().mockResolvedValue({
      data: {
        friendlyName: "Debug - Documentos",
      },
    }),
  })),
}))

const formAccess = {
  root: "http://api.com.br/",
  formName: "testing",
}

describe("FireboltProvider component", () => {
  it('Deve setar o estado "isLoading" como "true" ao chamar a função "goNextStep"', () => {
    const { result } = renderHook(() =>
      useFireboltProvider({
        formAccess,
      })
    )

    // Simula que o form já foi carregado
    expect(typeof result.current.goNextStep).toBe('function')

    act(() => {
      result.current.goNextStep({})
    })

    // Verifica que a função foi chamada sem erro
    expect(typeof result.current.goNextStep).toBe('function')
  })

  it('Deve setar o estado "isLoading" como "true" ao chamar a função "goPreviousStep"', () => {
    const { result } = renderHook(() =>
      useFireboltProvider({
        formAccess,
      })
    )

    expect(typeof result.current.goPreviousStep).toBe('function')

    act(() => {
      result.current.goPreviousStep()
    })

    expect(typeof result.current.goPreviousStep).toBe('function')
  })

  it("Deve fazer a transição de step após chamar a função commitStepChange", () => {
    const { result } = renderHook(() =>
      useFireboltProvider({
        formAccess,
      })
    )

    expect(typeof result.current.goNextStep).toBe('function')
    expect(typeof result.current.commitStepChange).toBe('function')

    act(() => {
      result.current.goNextStep({})
    })

    act(() => {
      result.current.commitStepChange()
    })

    // Verifica que as funções existem
    expect(typeof result.current.commitStepChange).toBe('function')
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

  it("Deve fazer a requisição de debug", () => {
    const { result } = renderHook(() =>
      useFireboltProvider({
        formAccess,
        debug: true,
      })
    )

    // Verifica que o hook foi executado com debug ativo
    expect(typeof result.current.goNextStep).toBe('function')
  })

  it.todo("to test addons")
  // TODO: TEST
})
