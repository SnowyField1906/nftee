import { useState, useEffect } from "react";
import { findPublicGateWay } from "../../utils/constants";
import { getCollectionNFTs } from "../../utils/ReadonlyContracts";
import { getCollectionInfo } from "../../utils/ReadonlyContracts";

import BigCollection from "./BigCollection";

import Collection from "./components/Collection";
import User from "../NFT/components/User";


function SmallCollection({ address, collection }) {
    const [bigCollection, setBigCollection] = useState(false)

    const [nfts, setNfts] = useState([]);
    const [collectionInfo, setCollectionInfo] = useState([]);

    useEffect(() => {
        const nftsAwait = async () => {
            await getCollectionNFTs(collection).then((res) => {
                setNfts(res)
            })
        }
        nftsAwait();

        const infoAwait = async () => {
            await getCollectionInfo(collection).then((res) => {
                setCollectionInfo(res)
            })
        }
        infoAwait();
    }, [])


    if (nfts.length === 0) {
        return (
            <div className="w-[21rem] h-[25.5rem] hover:scale-105 transform duration-300 ease-in-out select-none rounded-lg backdrop-blur-sm bg-gray-100/50 dark:bg-gray-800/50 bg- bg-cover bg-center"
                style={{
                    backgroundImage: `url(${findPublicGateWay(nfts[0])})`,
                }}
                onClick={() => setBigCollection(true)}>
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
                                        <p className="pl-4 font-bold text-lg text-black dark:text-white">{collectionInfo[0]}</p>
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
                {bigCollection &&
                    <div className="fixed w-screen h-screen z-30">
                        <BigCollection address={address} setBigCollection={setBigCollection} collection={collection} collectionInfo={collectionInfo} nfts={nfts} />
                    </div>}
                <div className="w-[21rem] h-[25.5rem] hover:scale-105 transform duration-300 ease-in-out select-none rounded-lg backdrop-blur-sm bg-gray-100/50 dark:bg-gray-800/50 bg- bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${findPublicGateWay(nfts[0])})`,
                    }}
                    onClick={() => setBigCollection(true)}>
                    <div className="absolute w-[21rem] h-[25.5rem] p-2 rounded-lg backdrop-blur-3xl bg-gray-100/30 dark:bg-gray-800/30 ">
                        <div className="w-80 h-80 grid grid-cols-2 grid-rows-2 gap-2">
                            {nfts.slice(0, 4).map((_, i) => {
                                return (
                                    <>
                                        <div
                                            className="relative w-full h-full bg- bg-cover bg-center overflow-hidden rounded-lg"
                                            style={{
                                                backgroundImage: `url(${findPublicGateWay(nfts[i])})`,
                                            }}>
                                            {i === 3 && nfts.length > 4 && (
                                                <div className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                                    <div className="text-white text-2xl font-semibold">
                                                        +{nfts.length - 4}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {findPublicGateWay(nfts[i]) ? null :
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
                                            <p className="pl-4 font-bold text-lg text-black dark:text-white">{collectionInfo[0]}</p>
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
