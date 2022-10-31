import { useState, useEffect } from "react";
import { findPublicGateWay } from "../../utils/constants";

import { removeNFT } from "../../utils/TransactionContracts";
import { getNFTInfo } from "../../utils/ReadonlyContracts";

import DeleteBigRed from "../Collection/components/DeleteBigRed";

function NFTCard({ address, setOpen, nft, setNFT, setNFTInfo, setBigNFT }) {
    const [temporaryNFTInfo, setTemporaryNFTInfo] = useState([])


    const infoAwait = async () => {
        await getNFTInfo(nft).then((res) => {
            setTemporaryNFTInfo(res)
        })
    }
    useEffect(() => {
        infoAwait();
    }, [setOpen, setNFT, setNFTInfo, setBigNFT])


    const openBigNFT = () => {
        setOpen('')
        setNFTInfo(temporaryNFTInfo)
        setNFT(nft)
        setBigNFT(true)
    }

    if (!temporaryNFTInfo || temporaryNFTInfo.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500">
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="group">
                <div className="absolute right-0 top-0 hidden group-hover:block fill-red-500 z-30 hover:scale-110 cursor-pointer"
                    onClick={() => removeNFT(nft, address + '/Cart')}>
                    <DeleteBigRed />
                </div>
                <div className="w-[25rem] h-[8rem] select-none bg- bg-cover bg-center"
                    onClick={openBigNFT}>
                    <div className="grid absolute w-[25rem] h-[8rem]">
                        <div className="mt-2 w-[24rem] h-[5rem] justify-self-center flex justify-between bg- bg-center bg-cover rounded-md"
                            style={{
                                backgroundImage: `url(${findPublicGateWay(nft)})`,
                            }}>
                        </div>
                        <div className='flex justify-between absolute bottom-0 w-[25rem] h-[2.5rem] place-items-center place-content-center'>
                            <p className="ml-4 font-bold text-lg text-black dark:text-white">{temporaryNFTInfo[0].slice(0, 8)}...{temporaryNFTInfo[0].slice(-5)}</p>
                            <p className="mr-4 font-bold text-lg text-black dark:text-white">{temporaryNFTInfo[1] / 1e18} ICX</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NFTCard
