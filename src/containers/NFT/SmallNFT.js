import { useState, useEffect } from "react"

import { findPublicGateWay } from "../../utils/constants"
import { addNFT } from "../../utils/TransactionContracts"
import { getNFTInfo } from "../../utils/ReadonlyContracts"

import BigNFT from "./BigNFT"

import User from "./components/User"
import Price from "./components/Price"
import Add from "./components/Add"
import AddToCart from "./components/AddToCart"
import AddToCollection from "./components/AddToCollection"
import SendRequest from "./components/SendRequest"


function SmallNFT({ nft, address }) {
    const [add, setAdd] = useState(false)
    const [bigNFT, setBigNFT] = useState(false)

    const [nftInfo, setNftInfo] = useState([]);
    const [addNFTParams, setAddNFTParams] = useState({
        _nft: nft,
        _collection: "hxf9bfff62e92b621dfd823439c822d73c7df8e698/My-waifu",
    })

    useEffect(() => {
        const nftInfo = async () => {
            await getNFTInfo(nft).then((res) => {
                setNftInfo(res)
            })
        }
        nftInfo()
    }, [nft])


    return (
        <>

            {bigNFT &&
                <div className="fixed w-screen h-screen z-50">
                    <BigNFT setBigNFT={setBigNFT} nft={nft} nftInfo={nftInfo} />
                </div>}

            <div className='inline-block my-10 rounded-lg hover:scale-105 transform duration-300 ease-in-out select-none'>
                <div className='absolute top-0 w-full h-3/4 z-10'
                    onClick={() => setBigNFT(true)}>
                </div>
                <div
                    className="relative w-80 h-80 bg- bg-cover bg-center max-w-xs overflow-hidden rounded-lg"
                    style={{
                        backgroundImage: `url(${findPublicGateWay(nft)})`,
                    }}>
                    <div className='flex justify-between absolute bottom-0 w-full h-1/4 backdrop-blur-md bg-gray-100/50 dark:bg-gray-800/50 rounded-b-lg'>
                        {add ?
                            <div className="grid justify-between items-center w-[13.5rem] h-full px-6">
                                <div className='h-10 w-[13.5rem] border-b-2 border-gray-800 dark:border-gray-200 border-opacity-20 dark:border-opacity-20'>
                                    <div className='pl-2 h-full w-full flex items-center transform duration-300 ease-in-out hover:scale-110'
                                        onClick={() => addNFT(addNFTParams._nft, address + "/cart")}>
                                        <AddToCart />
                                        <p className="pl-4 font-medium text-lg text-black dark:text-white">Add to cart</p>
                                    </div>
                                </div>
                                <div className='h-10 w-[13.5rem]'>
                                    <div className='pl-2 h-full w-full flex items-center transform duration-300 ease-in-out hover:scale-110'
                                        onClick={() => addNFT(addNFTParams._nft, addNFTParams._collection)}>
                                        <AddToCollection />
                                        <p className="pl-4 font-medium text-lg text-black dark:text-white">Add to collection</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="grid justify-between items-center w-[13.5rem] h-full px-6">
                                <div className='h-10 w-[13.5rem]'>
                                    <div className='pl-2 h-full w-full flex items-center'>
                                        <User />
                                        {nftInfo[0] && <p className="pl-4 font-bold text-lg text-black dark:text-white">{nftInfo[0].slice(0, 8)}...{nftInfo[0].slice(-5)}</p>}
                                    </div>
                                </div>
                                <div className='h-10 w-[13.5rem]'>
                                    <div className='pl-2 h-full w-full flex items-center'>
                                        <Price />
                                        <p className="pl-4 text-black dark:text-white">{nftInfo[1] / 1e9}
                                            <span className="font-semibold text-teal-800 dark:text-teal-200">&nbsp;&nbsp;ICX</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='grid justify-center justify-items-center items-center w-1/4 h-full z-20 '
                            onClick={() => setBigNFT(false)}>

                            <div className="flex h-1/3" onClick={() => setAdd(!add)}>
                                <Add active={add} />
                            </div>
                            <div className="flex h-1/3">
                                <SendRequest />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default SmallNFT
