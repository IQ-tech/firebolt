import { useEffect, useState, useRef } from "react"
// import { createFireboltForm, createPropsPreset } from "@iq-firebolt/client-core"
import { createFireboltForm } from "@iq-firebolt/client-core/lib"
import * as S from "./styles.js"
import transmorphersPropsPresets from "../../constants/transmorphers-props-presets"

// import BrPropsPresets from "@iq-firebolt/br-presets"


const CoreTest = () => {
  const [authKey, setAuthKey] = useState()
  const [stepSlug, setSlug] = useState("")

  // const formEngine = createFireboltForm({
  //   root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
  //   formName: "sample",
  // }

  const formEngine = useRef(
    createFireboltForm(
      {
        root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
        formName: "sample",
      },
      {
        requestMetadata: {
          agent: "asjdhf",
        },
        debug: true,
        addons: {
          uiPropsPresets: [
            transmorphersPropsPresets
          ],
        },
      }
    )
  )

  useEffect(() => {
    formEngine.current.start().then((data) => {
      setSlug(data.step.data.slug)
    })
  }, [])

  function proceedNext() {
    formEngine.current.nextStep("documents").then((data) => {
      console.log("nextStep", data)
    })
  }
  
  function proceedPrevious() {
    formEngine.current.previousStep("addres").then((data) => {
      console.log("previousStep", data)
    })
  }


  return (
    <div style={S.styleContainer}>
      <p>stepSlug: {stepSlug} </p>
      <div>
        {/* <button onClick={proceed}>Next</button> */}

        <button style={S.styleButton} onClick={proceedPrevious}>
          Previous
        </button>
        <button style={S.styleButton} onClick={proceedNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default CoreTest
