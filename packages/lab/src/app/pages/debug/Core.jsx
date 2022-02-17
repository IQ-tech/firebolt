import { useEffect, useState, useRef } from "react"
import { createFireboltForm, createPropsPreset } from "@iq-firebolt/client-core"
import * as S from "./styles.js"


import BrPropsPresets from "@iq-firebolt/br-presets"

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
          propsPresets: [
            BrPropsPresets
          ],
        },
      }
    )
  )

  useEffect(() => {
    formEngine.current.start().then((data) => {
      console.log(data)
    })
  }, [])

  function proceed() {
    formEngine.current.next("documents").then((data) => {
      console.log(data)
    })
  }

  return (
    <div style={S.styleContainer}>
      <p>stepSlug: {stepSlug} </p>
      <div>
        <button onClick={proceed}>Next</button>
        {/*         <button style={S.styleButton} onClick={getPreviousStep}>
          Previous
        </button>
        <button style={S.styleButton} onClick={getNextStep}>
          Next
        </button> */}
      </div>
    </div>
  )
}

export default CoreTest
