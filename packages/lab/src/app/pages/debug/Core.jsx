import { useEffect, useState, useRef } from "react"
import { createFireboltForm } from "@iq-firebolt/client-core"
import APIService from "../../../../../client-core/lib/services/API"
import * as S from "./styles.js"

const CoreTest = () => {
  const [authKey, setAuthKey] = useState()
  const [stepSlug, setSlug] = useState("")

  // const formEngine = createFireboltForm({
  //   root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
  //   formName: "sample",
  // })

  const formEngine = useRef(
    new APIService({
      formAccess: {
        root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev/",
        formName: "sample",
      },
    })
  )

  useEffect(() => {
    // formEngine.start()

    formEngine.current.getStartForm("paraabye").then((res) => {
      console.log("RES>>> ", res)
      setAuthKey(res.auth)
      setSlug(res.step.data.slug)
    })
  }, [])

  // function goNext() {
  //   formEngine.nextStep({"full_name": "asjdhjf", "email": "teste@sdkj.com" })
  // }

  function getNextStep() {
    formEngine.current
      .getNextStep(authKey, stepSlug, {
        stepFieldsPayload: {
          full_name: "Paranaue",
          email: "paranaue@teste.com",
        },
      })
      .then((res) => {
        console.log(res)
        setAuthKey(res.auth)
        setSlug(res.step.data.slug)
      })
  }

  function getPreviousStep() {
    console.log("SERVICE!!!!>>", formEngine)
    formEngine.current.getPreviousStep(authKey, stepSlug).then((res) => {
      console.log(res)
    })
  }

  return (
    <div style={S.styleContainer}>
      <p>stepSlug: {stepSlug} </p>
      <div>
        <button style={S.styleButton} onClick={getPreviousStep}>
          Previous
        </button>
        <button style={S.styleButton} onClick={getNextStep}>
          Next
        </button>
      </div>
    </div>
  )
}

export default CoreTest
