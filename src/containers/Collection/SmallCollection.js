import { useState } from "react";
import { findPublicGateWay } from "../../utils/constants";
import AddToCart from "../NFT/components/AddToCart";
import AddToCollection from "../NFT/components/AddToCollection";
import Add from "../NFT/components/Add";
import SendRequest from "../NFT/components/SendRequest";
import User from "../NFT/components/User";
import Price from "../NFT/components/Price";



function SmallCollection({ collectionMapNFTs }) {

    const [add, setAdd] = useState(false)

    return (
        <div className="w-[21rem] h-[25.5rem] mx-4 hover:scale-105 transform duration-300 ease-in-out mt-10 select-none rounded-lg backdrop-blur-sm bg-gray-100/50 dark:bg-gray-800/50 bg- bg-cover bg-center"
            style={{
                backgroundImage: `url(${findPublicGateWay(collectionMapNFTs[0])})`,
            }}>
            <div className="absolute w-[21rem] h-[25.5rem] p-2 rounded-lg backdrop-blur-3xl bg-gray-100/30 dark:bg-gray-800/30 ">
                <div className="w-80 h-80 grid grid-cols-2 grid-rows-2 gap-2">
                    {collectionMapNFTs.slice(0, 4).map((_, i) => {
                        return (
                            <>
                                <div
                                    className="relative w-full h-full bg- bg-cover bg-center overflow-hidden rounded-lg"
                                    style={{
                                        backgroundImage: `url(${findPublicGateWay(collectionMapNFTs[i])})`,
                                    }}>
                                    {i === 3 && collectionMapNFTs.length > 4 && (
                                        <div className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                            <div className="text-white text-2xl font-semibold">
                                                +{collectionMapNFTs.length - 4}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {findPublicGateWay(collectionMapNFTs[i]) ? null :
                                    <div className="animate-spin self-center justify-self-center rounded-full h-20 w-20 border-b-2 border-gray-900 dark:border-gray-100"></div>
                                }
                            </>

                        )
                    })}
                </div>
                <div className="absolute w-80 self-center justify-self-center justify-items-center">
                    <div className='flex justify-between absolute bottom-0 w-full h-1/4 rounded-b-lg'>
                        {add ?
                            <div className="grid justify-between items-center w-[13.5rem] h-full px-6">
                                <div className='h-10 w-[13.5rem] border-b-2 border-gray-800 dark:border-gray-200 border-opacity-20 dark:border-opacity-20
                        '>
                                    <div className='pl-2 h-full w-full flex items-center transform duration-300 ease-in-out hover:scale-110'>
                                        <AddToCart />
                                        <p className="pl-4 font-medium text-lg text-black dark:text-white">Add to cart</p>
                                    </div>
                                </div>
                                <div className='h-10 w-[13.5rem] '>
                                    <div className='pl-2 h-full w-full flex items-center transform duration-300 ease-in-out hover:scale-110'>
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
                                        <p className="pl-4 font-bold text-lg text-black dark:text-white">Address</p>
                                    </div>
                                </div>
                                <div className='h-10 w-[13.5rem]'>
                                    <div className='pl-2 h-full w-full flex items-center'>
                                        <Price />
                                        <p className="pl-4 text-black dark:text-white">Name</p>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='grid justify-center justify-items-center items-center w-1/4 h-20'>
                            <div className="self-center justify-self-center" onClick={() => setAdd(!add)}>
                                <Add active={add} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallCollection
