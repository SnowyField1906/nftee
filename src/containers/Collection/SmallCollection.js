import { useState, useEffect } from "react";
import { findPublicGateWay } from "../../utils/constants";
import { getCollectionInfo, getCollectionNFTs, getCollectionPublicNFTs } from "../../utils/ReadonlyContracts";


import Collection from "./components/Collection";
import User from "../NFT/components/User";


function SmallCollection({ collection, setCollection, setCollectionInfo, setNFTs, setBigCollection, isPublic }) {
    const [temporaryCollectionInfo, setTemporaryCollectionInfo] = useState([])
    const [temporaryNFTs, setTemporaryNFTs] = useState([])


    const publicNFTAwaits = async () => {
        await getCollectionPublicNFTs(collection).then((res) => {
            setTemporaryNFTs(res)
        })
    }
    const nftsAwait = async () => {
        await getCollectionNFTs(collection).then((res) => {
            setTemporaryNFTs(res)
        })
    }
    const infoAwait = async () => {
        await getCollectionInfo(collection).then((res) => {
            setTemporaryCollectionInfo(res)
        })
    }
    useEffect(() => {
        if (isPublic) {
            publicNFTAwaits();
        }
        else {
            nftsAwait();
        }
        infoAwait();
    }, [])

    const openBigCollection = () => {
        setCollectionInfo(temporaryCollectionInfo)
        setNFTs(temporaryNFTs)
        setCollection(collection)
        setBigCollection(true)
    }

    if (!temporaryCollectionInfo || temporaryCollectionInfo.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500">
                </div>
            </div>
        )
    }

    else if (temporaryNFTs.length === 0) {
        return (
            <div className="w-[21rem] h-[25.5rem] hover:scale-105 transform duration-300 ease-in-out select-none rounded-lg backdrop-blur-sm bg-gray-100/50 dark:bg-gray-800/50 bg- bg-cover bg-center"
                onClick={openBigCollection}>
                <div className="absolute w-[21rem] h-[25.5rem] p-2 rounded-lg backdrop-blur-3xl bg-gray-100/30 dark:bg-gray-800/30 ">
                    <div className="w-80 h-80 grid place-content-center">
                        <p className="text-xl font-bold text-white dark:text-gray-200">No NFTs</p>
                    </div>
                    <div className="absolute w-80 self-center justify-self-center justify-items-center">
                        <div className='flex justify-between absolute bottom-0 w-full h-1/4 rounded-b-lg'>
                            <div className="grid justify-between items-center w-[13.5rem] h-full px-6">
                                <div className='h-10 w-[13.5rem]'>
                                    <div className='pl-2 h-full w-full flex items-center'>
                                        <Collection />
                                        <p className="pl-4 font-bold text-lg text-black dark:text-white">{temporaryCollectionInfo[0]}</p>
                                    </div>
                                    <div className='h-10 w-[13.5rem]'>
                                        <div className='pl-2 h-full w-full flex items-center'>
                                            <User />
                                            {collection && <p className="pl-4 text-black dark:text-white">{collection.split('/')[0].slice(0, 8)}...{collection.split('/')[0].slice(-5)}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }


    else {
        return (
            <>
                <div className="w-[21rem] h-[25.5rem] hover:scale-105 transform duration-300 ease-in-out select-none rounded-lg backdrop-blur-sm bg-gray-100/50 dark:bg-gray-800/50 bg- bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${findPublicGateWay(temporaryNFTs[0])})`,
                    }}
                    onClick={openBigCollection}>
                    <div className="absolute w-[21rem] h-[25.5rem] p-2 rounded-lg backdrop-blur-3xl bg-gray-100/30 dark:bg-gray-800/30 ">
                        <div className="w-80 h-80 grid grid-cols-2 grid-rows-2 gap-2">
                            {temporaryNFTs.slice(0, 4).map((_, i) => {
                                return (
                                    <>
                                        <div
                                            className="relative w-full h-full bg- bg-cover bg-center overflow-hidden rounded-lg"
                                            style={{
                                                backgroundImage: `url(${findPublicGateWay(temporaryNFTs[i])})`,
                                            }}>
                                            {i === 3 && temporaryNFTs.length > 4 && (
                                                <div className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                                    <div className="text-white text-2xl font-semibold">
                                                        +{temporaryNFTs.length - 4}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {findPublicGateWay(temporaryNFTs[i]) ? null :
                                            <div className="animate-spin self-center justify-self-center rounded-full h-20 w-20 border-b-2 border-gray-900 dark:border-gray-100"></div>
                                        }
                                    </>

                                )
                            })}
                        </div>
                        <div className="absolute w-80 self-center justify-self-center justify-items-center">
                            <div className='flex justify-between absolute bottom-0 w-full h-1/4 rounded-b-lg'>
                                <div className="grid justify-between items-center w-[13.5rem] h-full px-6">
                                    <div className='h-10 w-[13.5rem]'>
                                        <div className='pl-2 h-full w-full flex items-center'>
                                            <Collection />
                                            <p className="pl-4 font-bold text-lg text-black dark:text-white">{temporaryCollectionInfo[0]}</p>
                                        </div>
                                        <div className='h-10 w-[13.5rem]'>
                                            <div className='pl-2 h-full w-full flex items-center'>
                                                <User />
                                                {collection && <p className="pl-4 text-black dark:text-white">{collection.split('/')[0].slice(0, 8)}...{collection.split('/')[0].slice(-5)}</p>}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SmallCollection
