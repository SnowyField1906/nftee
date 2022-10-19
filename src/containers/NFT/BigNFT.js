import { findPublicGateWay } from "../../utils/constants"

function BigNFT({ setBigNFT, nft, nftInfo }) {
    console.log(nftInfo)

    return (
        <div className='fixed mt-20 w-[80vw] h-[80vh] top-[5vh] left-[10vw] rounded-2xl z-20 backdrop-lg'>
            <div className='absolute top-0 right-0 m-4 z-30'>
                <svg className="h-8 w-8 fill-black dark:fill-white cursor-pointer" onClick={() => setBigNFT(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>
            </div>

            <div className="absolute top-0 right-0 w-full h-full grid grid-cols-2 grid-rows-1 z-0">
                <div className="h-full border-r bg- bg-contain bg-no-repeat bg-center overflow-hidden rounded-lg"
                    style={{
                        backgroundImage: `url(${findPublicGateWay(nft)})`,
                    }}>
                </div>
                <div className="h-full grid">
                    <div className="grid h-1/2 place-items-center justify-items-center">
                        <p className="text-high text-center font-medium">Owner: {nftInfo[0]}</p>
                        <p className="text-high text-center font-medium">Price: {nftInfo[1] / 1e9} ICX</p>
                        <p className="text-high text-center font-medium">Visibility: {nftInfo[2] === 'true' ? "Public" : "Private"}</p>
                        <p className="text-high text-center font-medium">Status: {nftInfo[3] === 'true' ? "On Sale" : "Not On Sale"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigNFT
