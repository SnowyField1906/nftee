import { useState, useEffect } from "react";
import { findPublicGateWay } from "../../utils/constants";
import AddToCart from "../NFT/components/AddToCart";
import AddToCollection from "../NFT/components/AddToCollection";
import Add from "../NFT/components/Add";
import User from "../NFT/components/User";
import Price from "../NFT/components/Price";

import { getCollectionNFTs } from "../../utils/ReadonlyContracts";
import { getCollectionInfo } from "../../utils/ReadonlyContracts";

function CollectionCard({ collection }) {
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
    }, [collection])
    if (nfts.length === 0) {
        return (
            <div className="w-[25rem] h-[8rem] select-none bg- bg-cover bg-center">
                <div className="grid absolute w-[25rem] h-[8rem]">
                    <div className="mt-2 w-[25rem] h-[5rem] place-content-center grid">
                        <p className="text-high text-center justify-self-center h-full">No NFTs</p>
                    </div>
                    <div className="relative ">
                        <div className='grid absolute bottom-0 w-[25rem] h-[3rem] place-content-center'>
                            <div className='h-full w-full flex self-center justify-self-center'>
                                <p className="font-bold text-lg text-black dark:text-white">{collectionInfo[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="w-[25rem] h-[8rem] select-none bg- bg-cover bg-center">
                <div className="grid absolute w-[25rem] h-[8rem]">
                    <div className="mt-2 w-[24rem] h-[5rem] justify-self-center flex justify-between">
                        {nfts.slice(0, 4).map((_, i) => {
                            return (
                                <>
                                    <div
                                        className="mx-1 relative w-full h-full bg- bg-cover bg-center overflow-hidden rounded-lg"
                                        style={{
                                            backgroundImage: `url(${findPublicGateWay(nfts[i])})`,
                                        }}>
                                        {i === 3 && nfts.length > 4 && (
                                            <div className="mx-1 absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
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
                    <div className="relative ">
                        <div className='grid absolute bottom-0 w-[25rem] h-[3rem] place-content-center'>
                            <div className='h-full w-full flex self-center justify-self-center'>
                                <p className="font-bold text-lg text-black dark:text-white">{collectionInfo[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CollectionCard