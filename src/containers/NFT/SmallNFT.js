import { useState, useEffect } from "react"

import { findPublicGateWay } from "../../utils/constants"
import { addNFT, addToCart, sendRequest, deleteNFT, editNFTInfo } from "../../utils/TransactionContracts"
import { getNFTInfo } from "../../utils/ReadonlyContracts"

import BigNFT from "./BigNFT"
import CollectionList from "../Collection/CollectionList"
import EditNFT from "./EditNFT"

import User from "./components/User"
import Price from "./components/Price"
import Add from "./components/Add"
import AddToCart from "./components/AddToCart"
import AddToCollection from "./components/AddToCollection"
import SendRequestBig from "./components/SendRequestBig"
import DeleteBig from "../Collection/components/DeleteBig"
import Edit from "../Collection/components/Edit"

function SmallNFT({ address, nft, setNFT, setNFTInfo, setBigNFT, setEditNFT, setCollectionList }) {
    const [temporaryNFTInfo, setTemporaryNFTInfo] = useState([])
    const [add, setAdd] = useState(false)

    const infoAwait = async () => {
        await getNFTInfo(nft).then((res) => setTemporaryNFTInfo(res))
    }

    useEffect(() => {
        infoAwait()
    }, [setNFT, setBigNFT, setEditNFT, setCollectionList])

    const openBigNFT = () => {
        setNFTInfo(temporaryNFTInfo)
        setNFT(nft)
        setBigNFT(true)
    }

    const openCollectionList = () => {
        setNFT(nft)
        setCollectionList(true)
    }

    const openEditNFT = () => {
        setNFTInfo(temporaryNFTInfo)
        setNFT(nft)
        setEditNFT(true)
    }


    if (!temporaryNFTInfo || temporaryNFTInfo.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500">
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='inline-block my-10 rounded-lg hover:scale-105 transform duration-300 ease-in-out select-none'>
                <div className='absolute top-0 w-full h-3/4 z-20'
                    onClick={openBigNFT}>
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
                                        onClick={openCollectionList}>
                                        <AddToCollection />
                                        <p className="pl-4 font-medium text-lg text-black dark:text-white">Add to collection</p>

                                    </div>
                                </div>
                                {address === temporaryNFTInfo[0] ?
                                    <div className='h-10 w-[13.5rem]'>
                                        <div className='pl-2 h-full w-full flex items-center transform duration-300 ease-in-out hover:scale-110'
                                            onClick={openEditNFT}>
                                            <Edit />
                                            <p className="pl-4 font-medium text-lg text-black dark:text-white">Edit information</p>
                                        </div>
                                    </div>
                                    :
                                    <div className='h-10 w-[13.5rem]'>
                                        <div className='pl-2 h-full w-full flex items-center transform duration-300 ease-in-out hover:scale-110'
                                            onClick={() => addToCart(address, nft)}>
                                            <AddToCart />
                                            <p className="pl-4 font-medium text-lg text-black dark:text-white">Add to cart</p>
                                        </div>
                                    </div>}
                            </div>
                            :
                            <div className="grid justify-between items-center w-[13.5rem] h-full px-6">
                                <div className='h-10 w-[13.5rem]'>
                                    <div className='pl-2 h-full w-full flex items-center'>
                                        <User />
                                        {temporaryNFTInfo[0] && <p className="pl-4 font-bold text-lg text-black dark:text-white">{temporaryNFTInfo[0].slice(0, 8)}...{temporaryNFTInfo[0].slice(-5)}</p>}
                                    </div>
                                </div>
                                <div className='h-10 w-[13.5rem]'>
                                    <div className='pl-2 h-full w-full flex items-center'>
                                        <Price />
                                        <p className="pl-4 text-black dark:text-white">{temporaryNFTInfo[1] / 1e18}
                                            <span className="font-semibold text-teal-800 dark:text-teal-200">&nbsp;&nbsp;ICX</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='grid justify-center justify-items-center items-center w-1/4 h-full z-50 '
                            onClick={() => setBigNFT(false)}>

                            <div className="flex h-1/3" onClick={() => setAdd(!add)}>
                                <Add active={add} />
                            </div>
                            {address === temporaryNFTInfo[0] ?
                                <div className="flex h-1/3" onClick={() => deleteNFT(address, nft)}>
                                    <DeleteBig />
                                </div>
                                :
                                <div className="flex h-1/3" onClick={() => sendRequest(address, nft)}>
                                    <SendRequestBig />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default SmallNFT
