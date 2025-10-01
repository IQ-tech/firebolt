import "@testing-library/jest-dom"
import { vi } from "vitest"

// Setup específico para testes React com Vitest no package client
// Mock localStorage and sessionStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value?.toString() || ""
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
})

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Configurar React 18 para usar legacy root (sem Concurrent Mode)
// para evitar double-firing nos testes
vi.mock("react-dom/client", () => {
  const ReactDOM = vi.importActual("react-dom")
  return {
    ...ReactDOM,
    createRoot: undefined, // Força usar legacy ReactDOM.render
  }
})
