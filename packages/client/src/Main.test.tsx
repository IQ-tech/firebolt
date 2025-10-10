import {
  vi,
  type MockedFunction,
  it,
  describe,
  beforeEach,
  expect,
} from "vitest"
import { render, screen } from "@testing-library/react"
import axios from "axios"
import { StepForm, Wizard, clearFormSession, FireboltProvider } from "./index"
import Theme from "@iq-firebolt/material-theme"
import * as propsPresetsMock from "../__mocks__/props-presets-steps" // TODO - create common mocks on root

import { IFormAccess, IPropsPresetCollection } from "@iq-firebolt/client-core"

vi.mock("axios")

const formAccess: IFormAccess = {
  root: "http://api.com.br/",
  formName: "testing",
}

const DefaultTemplate = (firebolt: any) => <StepForm theme={Theme} />

const MockComponent = (addons: IPropsPresetCollection[]) =>
  render(
    <FireboltProvider
      formAccess={formAccess}
      addons={{
        uiPropsPresets: addons,
      }}
    >
      <Wizard fallback={<p>loading</p>}>
        <Wizard.Step match="*" component={DefaultTemplate} />
      </Wizard>
    </FireboltProvider>
  )

describe("testing props-presets render", () => {
  beforeEach(() => {
    clearFormSession()
  })

  it("should render field with props:preset without collection", async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: propsPresetsMock.getRequestMock("cod"),
    })

    MockComponent([propsPresetsMock.customCollection])

    expect(
      await screen.findByPlaceholderText(/write something/)
    ).toBeInTheDocument()
  })

  it("should render field with props:preset with collection", async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: propsPresetsMock.getRequestMock("cod:second-preset-collection"),
    })

    MockComponent([
      propsPresetsMock.customCollection,
      propsPresetsMock.secondCollection,
    ])

    expect(
      await screen.findByPlaceholderText(/second collection cod/)
    ).toBeInTheDocument()
  })

  it("should render field with overwritten props:preset", async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: propsPresetsMock.getRequestMock("bat", true),
    })

    MockComponent([propsPresetsMock.customCollection])

    expect(
      await screen.findByPlaceholderText(/Nome completo/)
    ).toBeInTheDocument()
  })
})

describe("Force failure", () => {
  it("should pass intentionally", () => {
    expect(true).toBe(true)
  })
})
