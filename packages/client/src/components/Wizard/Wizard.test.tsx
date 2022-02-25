import { render, fireEvent, waitFor } from "@testing-library/react"
import axios from "axios"

import FireboltProvider from "../FireboltProvider"
import Wizard from "../Wizard/index"

jest.mock("axios")

describe("Wizard component", () => {
  const fallback = <div>Fallback</div>
  const formInfo = {
    root: "http://api.com.br/",
    formName: "testing",
  }

  ;(axios.get as jest.Mock).mockResolvedValue({ data: {} })

  it("Should render fallback when go to the next step - call goNextStep function", async () => {
    const { getByText } = render(
      <FireboltProvider formAccess={formInfo}>
        <Wizard fallback={fallback}>
          <Wizard.Step
            match="*"
            component={({ fireboltStep }) => (
              <button onClick={() => fireboltStep.goNextStep()}>proceed</button>
            )}
          />
        </Wizard>
      </FireboltProvider>
    )

    await waitFor(() => {
      const buttonNextStep = getByText("proceed")
      fireEvent.click(buttonNextStep)
      expect(getByText("Fallback")).toBeInTheDocument()
    })
  })

  it("Should render fallback when go to the previous step - call goPreviousStep function", async () => {
    const { getByText } = render(
      <FireboltProvider formAccess={formInfo}>
        <Wizard fallback={fallback}>
          <Wizard.Step
            match="*"
            component={({ fireboltStep }) => (
              <button onClick={() => fireboltStep.goPreviousStep()}>
                previous
              </button>
            )}
          />
        </Wizard>
      </FireboltProvider>
    )

    await waitFor(() => {
      const buttonNextStep = getByText("previous")
      fireEvent.click(buttonNextStep)
      expect(getByText("Fallback")).toBeInTheDocument()
    })
  })
})
