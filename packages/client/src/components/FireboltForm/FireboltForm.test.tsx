import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import axios from "axios"

import { createFireboltForm } from "@iq-firebolt/client-core/lib"
import { clearAllFormSessions } from "@iq-firebolt/client-core/lib/helpers/session/clearFormSession"
import startFormResponse from "@iq-firebolt/client-core/lib/__mocks__/startFormResponse"
import materialTheme from "@iq-firebolt/material-theme"

import FireboltForm from "./index"

jest.mock("axios")

//#region MOCKS
const mockBlur = jest.fn(() => () => {})
const mockChange = jest.fn(() => () => {})
const mockSubmit = jest.fn((e) => e.preventDefault())
const mockGoBack = jest.fn(() => {})
const mockFocus = jest.fn()

jest.mock("./hook/useFormEvents", () => {
  return jest.fn().mockImplementation(() => {
    return {
      handleSubmit: mockSubmit,
      handleGoBack: mockGoBack,
      getFieldEvent: {
        onBlur: mockBlur,
        onChange: mockChange,
        onFocus: mockFocus,
      },
    }
  })
})
//#endregion

describe("firebolt form test", () => {
  const fields: any[] = []
  const textField = {
    "slug": "full_name",
    "ui:widget": "Text",
    "ui:props": {
      "placeholder": "Name",
    },
    "validators": [{ "type": "required" }, { "type": "name" }],
    "meta": {},
  }

  beforeEach(() => {
    fields.splice(0, fields.length)
    fields.push(textField)
  })

  it("able to validate the field in onblur event", () => {
    const { getByPlaceholderText } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )

    const input = getByPlaceholderText("Name")
    const value = "John Doe"

    fireEvent.blur(input, { target: { value: value } })
    expect(input).toHaveValue(value)
    expect(mockBlur).toHaveBeenCalled()
  })

  it("able to call the submit function", () => {
    const { getByTestId } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )

    const button = getByTestId("fbt-submit-button")
    fireEvent.click(button)

    expect(mockSubmit).toHaveBeenCalled()
  })

  it("able to call goBack function", () => {
    const { getByText } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )

    const button = getByText("Previous Step")
    fireEvent.click(button)

    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })

  it("able to render text field correctly", () => {
    const { getByPlaceholderText } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )
    const input = getByPlaceholderText("Name")

    expect(input).toBeInTheDocument()
    expect(input).toBeRequired()
  })

  it("able to render an text field without 'required' property", () => {
    const emailField = {
      "slug": "email",
      "ui:widget": "Email",
      "ui:props": {
        "label": "E-mail",
        "placeholder": "Type your e-mail",
      },
      "validators": [{ "type": "email" }],
      "meta": {},
    }

    fields.push(emailField)
    const { container } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )
    const field = container.querySelector(`input[name='${emailField.slug}']`)

    expect(field).toBeInTheDocument()
    expect(field).not.toBeRequired()
  })

  it("able to render radio field correctly", () => {
    const radioField = {
      "slug": "radio_test",
      "ui:widget": "Radio",
      "ui:props": {
        "label": "Radio Test",
        "options": [
          {
            "value": "option-1",
            "label": "Option-1",
          },
          {
            "value": "option-2",
            "label": "Option-2",
          },
        ],
      },
      "validators": [{ "type": "required" }],
      "meta": {},
    }

    fields.push(radioField)
    const { container } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )
    const options = container.querySelectorAll(
      `input[name='firebolt-form-field-${radioField.slug}']`
    )

    expect(options[0]).toBeInTheDocument()
    expect(options[0]).toHaveProperty("type", "radio")
    expect(options[0]).toHaveProperty("value", "option-1")

    expect(options[1]).toBeInTheDocument()
    expect(options[1]).toHaveProperty("type", "radio")
    expect(options[1]).toHaveProperty("value", "option-2")
  })

  it("able to render select field correctly", async () => {
    const selectField = {
      "slug": "select_field",
      "ui:widget": "Select",
      "ui:props": {
        "label": "Select Test",
        "options": [
          { "value": "1", "label": "Test1" },
          { "value": "2", "label": "Test2" },
          { "value": "3", "label": "Test3" },
        ],
      },
      "validators": [{ "type": "required" }],
      "meta": {},
    }

    fields.pop()
    fields.push(selectField)

    const { container, getByText } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )

    expect(container.querySelector("legend")).toHaveTextContent("Select Test")

    const button = container.querySelector(
      `#firebolt-form-field-${selectField.slug}`
    )
    fireEvent.mouseDown(button as any)

    expect(getByText("Test1")).toBeInTheDocument()
    expect(getByText("Test2")).toBeInTheDocument()
    expect(getByText("Test3")).toBeInTheDocument()
  })

  it("able to render 'check' field correctly", () => {
    const checkField = {
      "slug": "check_test",
      "ui:widget": "Check",
      "ui:props": {
        "label": "checkTest",
      },
      "validators": [{ "type": "required" }],
    }

    fields.pop()
    fields.push(checkField)
    const { container, getByText, debug } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )

    const option = getByText("checkTest")
    const checkbox = container.querySelector("input[type='checkbox']")
    expect(option).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it("able to render 'checkGroup' fields correctly", () => {
    const checkOptions = [
      { "label": "option1" },
      { "label": "option2" },
      { "label": "option3" },
    ]

    const checkGrouField = {
      "slug": "check_test",
      "ui:widget": "CheckboxGroup",
      "ui:props": {
        "label": "CheckTest",
        "columns": 2,
        "options": checkOptions,
      },
      "meta": {},
    }

    fields.pop()
    fields.push(checkGrouField)

    const { container, getByText } = render(
      <FireboltForm theme={materialTheme} schema={fields} />
    )
    const options = container.querySelectorAll("input[type='checkbox']")
    expect(options).toHaveLength(3)
    checkOptions.forEach((item) =>
      expect(getByText(item.label)).toBeInTheDocument()
    )
  })

  it("able to render customActionsChild", () => {
    const ActionButtons = ({ goNext, goBack }) => (
      <>
        <button onClick={goBack}>TestBack</button>
        <button onClick={goNext}>TestNext</button>
      </>
    )
    const mockNext = jest.fn()
    const mockBack = jest.fn()

    const { getByText } = render(
      <FireboltForm
        schema={fields}
        theme={materialTheme}
        customActionsChild={() => (
          <ActionButtons goNext={mockNext} goBack={mockBack} />
        )}
      />
    )

    const buttonBack = getByText("TestBack")
    const buttonNext = getByText("TestNext")

    expect(buttonBack).toBeInTheDocument()
    expect(buttonNext).toBeInTheDocument()

    fireEvent.click(buttonBack)
    fireEvent.click(buttonNext)
    expect(mockBack).toHaveBeenCalledTimes(1)
    expect(mockNext).toHaveBeenCalledTimes(1)
  })
})

describe("autofilled fields test", () => {
  const autoFillBase64 =
    "autofill=JTdCJTI3bmFtZSUyNyUzQSU3QiUyN3ZhbHVlJTI3JTNBJTI3UnVhbiUyMEJlcnQlQzMlQTklMjclMkMlMjdtYXNrJTI3JTNBJTI3JTI3JTdEJTJDJTI3Y3BmJTI3JTNBJTdCJTI3dmFsdWUlMjclM0ElMjc0NTAuNTkyLjczOC01NyUyNyUyQyUyN21hc2slMjclM0ElMjdjcGYlMjclN0QlMkMlMjdlbWFpbCUyNyUzQSU3QiUyN3ZhbHVlJTI3JTNBJTI3YmVydGUucnVhbiU0MGdtYWlsLmNvbSUyNyUyQyUyN21hc2slMjclM0ElMjclMjclN0QlMkMlMjdpbmNvbWUlMjclM0ElN0IlMjd2YWx1ZSUyNyUzQSUyNzYwMDAlMjclMkMlMjdtYXNrJTI3JTNBJTI3bW9uZXklMjclN0QlMkMlMjdwaG9uZSUyNyUzQSU3QiUyN3ZhbHVlJTI3JTNBJTI3NDI5OTk4ODM3NjglMjclMkMlMjdtYXNrJTI3JTNBJTI3cGhvbmVfbnVtYmVyJTI3JTdEJTdE"

  const formName = "partnerFormPotato"

  const form = createFireboltForm({
    root: "https://my-firebolt-api/",
    formName,
  })

  beforeEach(() => {
    // clearAllFormSessions()

    (axios.get as jest.Mock).mockResolvedValue({ data: startFormResponse })

    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        search: autoFillBase64,
        href: autoFillBase64,
      },
    })
  })

  test("Should render the email field with the value already filled", async () => {
    // get first step
    const formStartResult = await form.start()

    const { container } = render(
      <FireboltForm
        theme={materialTheme}
        schema={formStartResult.step.data.fields}
      />
    )

    const emailField = container.querySelector(`input[name='email']`)

    expect(emailField).toHaveValue("berte.ruan@gmail.com")
  })
})
