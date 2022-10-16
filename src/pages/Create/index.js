import { useEffect, useState } from "react";
import axios from "axios";

import { findPublicGateWay } from "../../utils/constants";

import { sendTx } from "../../utils/contracts";

function Create({ account }) {
  const [createNFTParams, setCreateNFTParams] = useState({
    _address: account.address,
    _price: 0,
    _onSale: null,
    _visibility: null,
    _ipfs: "",
  });

  useEffect(() => {
    if (createNFTParams._onSale === null) {
      setCreateNFTParams({
        ...createNFTParams,
        _onSale: false,
      });
    }
    if (createNFTParams._visibility === null) {
      setCreateNFTParams({
        ...createNFTParams,
        _visibility: false,
      });
    }
  }, [createNFTParams._onSale, createNFTParams._visibility]);

  console.log(createNFTParams);

  const [status, setStatus] = useState();

  const uploadImage = (e) => {
    setStatus('Uploading...')
    sendFileToIPFS(e, e.target.files[0]);
  }

  const sendFileToIPFS = async (e, fileImg) => {
    setStatus("Starting...");
    e.preventDefault();
    setStatus("Checking file...")
    if (fileImg) {
      try {
        setStatus("Uploading file to IPFS...")
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data"
          },
        });

        console.log(resFile.data.IpfsHash);

        setCreateNFTParams({ ...createNFTParams, _ipfs: resFile.data.IpfsHash });

        setStatus("Finding gateway...")

        const url = findPublicGateWay(resFile.data.IpfsHash);
        setStatus(url)

      } catch (error) {
        setStatus("Error uploading file to IPFS");
      }
    }
  }

  const createNFT = async () => {
    const txObj = sendTx(
      account.address,
      "createNFT",
      createNFTParams,
    );
    console.log(txObj);
  }


  return (
    <div className="grid grid-cols-2 grid-rows-1 w-11/12 h-full pt-20">
      <div className="grid self-center justify-self-center justify-items-center place-items-center">
        <div className="w-[30vw] h-[30vw] transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-500 hover:scale-105 focus:outline-none">
          <label className="grid w-full h-full justify-self-center">
            {!status ?
              <>
                <span className="flex self-center justify-self-center items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop files to attach, or&nbsp;
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                </span>
                <input type="file" name="file_upload" className="w-full h-full hidden" onChange={(e) => uploadImage(e)} required />

              </>
              : status.slice(0, 5) !== "https" ?
                <p className="text-center self-center">
                  {status}
                </p>
                :
                <div
                  className="relative w-full h-full bg- bg-cover bg-center overflow-hidden rounded-lg"
                  style={{
                    backgroundImage: `url(${status})`,
                  }}>
                </div>
            }
          </label>
        </div>
      </div>

      <div className="grid">
        <div className="flex">
          <p className="text-xl place-self-center">Price:</p>
          <input className="place-self-center ml-4 w-4/5 h-10 px-4 transition bg-white border-2 border-gray-300 rounded-md appearance-none cursor-pointer hover:border-gray-500 focus:outline-none"
            type="number" placeholder="Price"
            onChange={(e) => setCreateNFTParams({ ...createNFTParams, _price: e.target.value })} />
        </div>

        <div className="flex">
          <p className="text-xl place-self-center">On Sale:</p>
          <input className="place-self-center ml-4"
            type="checkbox" placeholder="On Sale"
            onChange={(e) => setCreateNFTParams({ ...createNFTParams, _onSale: e.target.checked })} />
        </div>

        <div className="flex">
          <p className="text-xl place-self-center">Visibility:</p>
          <input className="place-self-center ml-4"
            type="checkbox" placeholder="Visibility"
            onChange={(e) => setCreateNFTParams({ ...createNFTParams, _visibility: e.target.checked })} />
        </div>




        <button onClick={createNFT}>Create</button>

      </div>

    </div >
  );
}

export default Create;