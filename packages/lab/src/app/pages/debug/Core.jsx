import { useEffect, useState, useRef } from "react";
import APIService from "../../../../../client-core/lib/services/API";

const CoreTest = () => {
  const [authKey, setAuthKey] = useState();
  const [stepSlug, setSlug] = useState("");
  const service = useRef(
    new APIService({
      formAccess: {
        root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev/",
        formName: "sample",
      },
    })
  );

  useEffect(() => {
    service.current.getStartForm("sdsf").then((res) => {
      setAuthKey(res.auth);
      setSlug(res.step.data.slug);
    });
  }, []);

  function getNextStep() {
    service.current
      .getNextStep(authKey, stepSlug, {
        stepFieldsPayload: {
          full_name: "teste cneoura",
          email: "batata@cenoura.com",
        },
      })
      .then((res) => {
        setAuthKey(res.auth);
        setSlug(res.step.data.slug);
      });
  }

  function getPreviousStep() {
    service.current.getPreviousStep(authKey, stepSlug).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <p>{stepSlug} </p>
      <button onClick={getPreviousStep}>previous</button>
      <button onClick={getNextStep}>next</button>
    </div>
  );
};

export default CoreTest;
