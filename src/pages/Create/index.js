import { useState } from "react";

import { Web3Storage } from "web3.storage";

const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM1NzkyYjZFZjhFYzBmQWNmMmRFYjhiNTQ4NzNCMjE1NjUwYUYxMEYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjU2NDYyMjgyODAsIm5hbWUiOiJORlRlZSJ9.Pmj_QjgrGmrE3e-N9uehim-f4la6k0w5llbepqtr-J8"
const client = new Web3Storage({ token: apiToken });

function Create() {
  const [file, setFile] = useState("");
  const handleUpload = async () => {
    var fileInput = document.getElementById("input");

    const rootCid = await client.put(fileInput.files);

    console.log(rootCid);

    const res = await client.get(rootCid);
    const files = await res.files();
    console.log(files);
    const url = URL.createObjectURL(files[0]);
    console.log(url);
    setFile(url);
  };
  return (
    <div className="App">
      <h2>Decentralized file storage system</h2>
      <h1>Hello CodeSandbox</h1>
      <img alt="hi" src={file} />

      <div>
        <label for="file">Choose file to upload</label>
        <input type="file" id="input" name="file" multiple />
      </div>
      <div>
        <button onClick={handleUpload}>Submit</button>
      </div>
    </div>
  );
}

export default Create;