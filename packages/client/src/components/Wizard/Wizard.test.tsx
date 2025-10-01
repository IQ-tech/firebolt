// TODO: Fix JSX compilation issues
/*
import React from "react"
import { vi, type MockedFunction } from "vitest"
import { render, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import axios from "axios"

import FireboltProvider from "../FireboltProvider"
import Wizard from "../Wizard/index"

vi.mock("axios")

describe("Wizard component", () => {
  const fallback = <div>Fallback</div>
  
  (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: {} })

  const formInfo = {
    root: "http://api.com.br/",
    formName: "testing",
  }

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
*/
