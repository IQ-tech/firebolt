import { render, fireEvent, waitFor, screen, debug } from "@testing-library/react"
import axios from "axios"
import { StepForm, Wizard, clearFormSession, FireboltProvider } from "./index"
import Theme from "@iq-firebolt/material-theme"
import * as propsPresetsMock from "../__mocks__/props-presets-steps" // TODO - create common mocks on root

jest.mock("axios")

const formAccess = {
  root: "http://api.com.br/",
  formName: "testing",
}

const DefaultTemplate = (fireboltStep) => <StepForm theme={Theme} />

const MockComponent = (addons = []) =>
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
    axios.get.mockResolvedValue({
      data: propsPresetsMock.getRequestMock("cod"),
    })

    MockComponent([propsPresetsMock.customCollection])

    await waitFor(() => {})

    expect(screen.getByPlaceholderText("write something")).toBeInTheDocument()
  })

  it("should render field with props:preset with collection", async () => {
    axios.get.mockResolvedValue({
      data: propsPresetsMock.getRequestMock("cod:second-preset-collection"),
    })

    MockComponent([propsPresetsMock.customCollection, propsPresetsMock.secondCollection])
    
    await waitFor(() => {})

    expect(screen.getByPlaceholderText('second collection cod')).toBeInTheDocument()
  })

  it("should render field with overwritten props:preset", async () => {
    axios.get.mockResolvedValue({
      data: propsPresetsMock.getRequestMock("bat", true),
    })

   MockComponent([propsPresetsMock.customCollection])

    await waitFor(() => {})
    
    expect(screen.getByPlaceholderText('Nome completo'))
  })
})
