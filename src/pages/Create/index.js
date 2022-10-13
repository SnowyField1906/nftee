import { useState } from "react";
import axios from "axios";

const REACT_APP_PINATA_API_KEY = "a1ed4cb699e3544aad6a";
const REACT_APP_PINATA_API_SECRET = "c09ff55d059fd8f6bb98c69733f753449d1e5987cd6dbb3933896324bf834656";

function Create() {
  const [fileImg, setFileImg] = useState(null);
  const [imageHash, setImageHash] = useState(null);
  const publicGateway = [
    "https://ipfs.eth.aragon.network/ipfs/",
    "https://ipfs.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.fleek.co/ipfs/",
    "https://ipfs.infura.io/ipfs/",
  ]

  const sendFileToIPFS = async (e) => {
    e.preventDefault();
    if (fileImg) {
      try {

        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data"
          },
        });

        setImageHash(resFile.data.IpfsHash);
        console.log(imageHash);
      } catch (error) {
        console.log("Error sending File to IPFS: ")
        console.log(error)
      }
    }

  }

  return (
    <div className="w-screen h-1/2 pt-[200px]">
      <form onSubmit={sendFileToIPFS}>
        <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
        <button type='submit' >Mint NFT</button>
      </form>

      <div
        className="relative w-80 h-80 bg- bg-cover bg-center max-w-xs overflow-hidden rounded-lg"
        style={{
          backgroundImage: `url(https://cloudflare-ipfs.com/ipfs/${imageHash})`,
        }}>

      </div>

    </div>
  );
}

export default Create;