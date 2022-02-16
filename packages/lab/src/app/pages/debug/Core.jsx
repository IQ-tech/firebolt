import { useEffect, useState, useRef } from "react"
import { createFireboltForm } from "@iq-firebolt/client-core"

const formEngine = createFireboltForm({
  root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
  formName: "sample",
})

const CoreTest = () => {
  const [authKey, setAuthKey] = useState()
  const [stepSlug, setSlug] = useState("")

  useEffect(() => {
    formEngine.start()
  }, [])

  function goNext() {
    formEngine.nextStep({"full_name": "asjdhjf", "email": "teste@sdkj.com" })
  }

  return (
    <div>
      <p>{stepSlug} </p>

      <button onClick={goNext}>next</button>
    </div>
  )
}

export default CoreTest
