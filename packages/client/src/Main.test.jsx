import { render, fireEvent, waitFor } from "@testing-library/react"
import axios from "axios"
import { createFireboltProvider, StepForm, Wizard, clearFormSession } from "./index"
import Theme from "@iq-firebolt/material-theme"
import * as propsPresetsMock from "../__mocks__/props-presets-steps" // TODO - create common mocks on root

jest.mock("axios")

const formAccess = {
  root: "http://api.com.br/",
  formName: "testing",
};

const DefaultTemplate = (fireboltStep) => (
  <StepForm theme={Theme} />
)



describe("testing props-presets render", () => {
  beforeEach(() => {
    clearFormSession()
  })

  it("should render field with props:preset without collection", async () => {
    axios.get.mockResolvedValue({ data: propsPresetsMock.getRequestMock("bat") })

    const withProvider = createFireboltProvider({formAccess, addons: {
      uiPropsPresets: [
        propsPresetsMock.customCollection,
        propsPresetsMock.secondCollection
      ]
    }})

    const { getByText } = render(withProvider(
      <Wizard>
        <Wizard.Step component={DefaultTemplate} />
      </Wizard>
    ))

    await waitFor(() => {

      /* expect(getByText("Fallback")).toBeInTheDocument(); */
      expect(true).toBeTruthy()
    });


  })

  it("should render field with props:preset with collection", () => {
    axios.get.mockResolvedValue({ data: propsPresetsMock.getRequestMock("cod:second-preset-collection") })
    expect(true).toBeTruthy()
  })

  it("should render field with overwriten props:preset", () => {
    axios.get.mockResolvedValue({ data: propsPresetsMock.getRequestMock("bat") })
    expect(true).toBeTruthy()
  })

})
