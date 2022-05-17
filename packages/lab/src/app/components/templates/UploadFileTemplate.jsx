import { useState, useEffect } from 'react'
import { FireboltForm } from "@iq-firebolt/client/src";
import { useFirebolt } from "@iq-firebolt/client/src";

const DefaultTemplate = ({ fireboltStep }) => {
  const {
    uploadFile
  } = useFirebolt()

  const [file, setFile] = useState()

  function handleFile(e, fileName) {
    e.preventDefault()

    console.log(e.target.files)
    uploadFile(e.target.files[0], fileName)
  }

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>My custom form template for upload files</p>
        <br />
        <p>selfie</p> 
        <input type="file" onChange={(e) => handleFile(e, 'selfie')}/><br />
        <br />

        <p>frente</p>
        <input type="file" onChange={(e) => handleFile(e, 'doc-front')}/><br />
        <br />
        <p>verso</p>
        <input type="file" onChange={(e) => handleFile(e, 'doc-back')}/>
      </div>
    </div>
  );
};

export default DefaultTemplate;
