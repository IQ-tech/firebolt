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

// Configurar React 18 com createRoot para testes
import { configure } from "@testing-library/react"

// Configurar testing-library para React 18
configure({
  // Configurações básicas para testes
  testIdAttribute: "data-testid",
})
