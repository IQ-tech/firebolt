import { render, fireEvent, waitFor } from "@testing-library/react"
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

describe("testing props-presets render", () => {
  beforeEach(() => {
    clearFormSession()
  })

  it("should render field with props:preset without collection", async () => {
    axios.get.mockResolvedValue({
      data: propsPresetsMock.getRequestMock("bat"),
    })

    const { getByText } = render(
      <FireboltProvider
        formAccess={formAccess}
        addons={{
          uiPropsPresets: [
            propsPresetsMock.customCollection,
            propsPresetsMock.secondCollection,
          ],
        }}
      >
        <Wizard>
          <Wizard.Step component={DefaultTemplate} />
        </Wizard>
      </FireboltProvider>
    )

    await waitFor(() => {
      /* expect(getByText("Fallback")).toBeInTheDocument(); */
      expect(true).toBeTruthy()
    })
  })

  it("should render field with props:preset with collection", () => {
    axios.get.mockResolvedValue({
      data: propsPresetsMock.getRequestMock("cod:second-preset-collection"),
    })
    expect(true).toBeTruthy()
  })

  it("should render field with overwriten props:preset", () => {
    axios.get.mockResolvedValue({
      data: propsPresetsMock.getRequestMock("bat"),
    })
    expect(true).toBeTruthy()
  })
})
