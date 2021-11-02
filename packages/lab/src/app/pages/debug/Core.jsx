import { useEffect } from "react";
import APIService from "../../../../../client-core/lib/services/API";

const CoreTest = () => {
  useEffect(() => {
    const service = new APIService({
      formAccess: {
        root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev/",
        formName: "sample",
      },
    });

    service.getStartForm('sdsf').then(data => {
      console.log(data)
    });

    console.log(service);
  }, []);

  return <p>debug core</p>;
};

export default CoreTest;
