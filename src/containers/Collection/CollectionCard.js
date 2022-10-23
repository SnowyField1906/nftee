import { useState, useEffect } from "react";
import { findPublicGateWay } from "../../utils/constants";

import { getCollectionInfo, getCollectionNFTs } from "../../utils/ReadonlyContracts";


function CollectionCard({ setOpen, collection, setCollection, setCollectionInfo, setNFTs, setBigCollection }) {
    const [temporaryCollectionInfo, setTemporaryCollectionInfo] = useState([])
    const [temporaryNFTs, setTemporaryNFTs] = useState([])


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
        nftsAwait();
        infoAwait();
    }, [setOpen, setCollection, setBigCollection])


    const openBigCollection = () => {
        setOpen('')
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
            <div className="w-[25rem] h-[8rem] select-none bg- bg-cover bg-center">
                <div className="grid absolute w-[25rem] h-[8rem]">
                    <div className="mt-2 w-[25rem] h-[5rem] place-content-center grid">
                        <p className="text-high text-center justify-self-center h-full">No NFTs</p>
                    </div>
                    <div className="relative ">
                        <div className='grid absolute bottom-0 w-[25rem] h-[2.5rem] place-content-center'>
                            <div className='h-full w-full flex self-center justify-self-center'>
                                <p className="font-bold text-lg text-black dark:text-white">{temporaryCollectionInfo[0]}</p>
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
                <div className="w-[25rem] h-[8rem] select-none bg- bg-cover bg-center"
                    onClick={openBigCollection}>
                    <div className="grid absolute w-[25rem] h-[8rem]">
                        <div className="mt-2 w-[24rem] h-[5rem] justify-self-center flex justify-between">
                            {temporaryNFTs.slice(0, 4).map((_, i) => {
                                return (
                                    <>
                                        <div
                                            className="mx-1 relative w-full h-full bg- bg-cover bg-center overflow-hidden rounded-lg"
                                            style={{
                                                backgroundImage: `url(${findPublicGateWay(temporaryNFTs[i])})`,
                                            }}>
                                            {i === 3 && temporaryNFTs.length > 4 && (
                                                <div className="absolute w-full h-full bg-black/50 flex justify-center items-center">
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
                        <div className="relative ">
                            <div className='grid absolute bottom-0 w-[25rem] h-[2.5rem] place-content-center'>
                                <div className='h-full w-full flex self-center justify-self-center'>
                                    <p className="font-bold text-lg text-black dark:text-white">{temporaryCollectionInfo[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CollectionCard
