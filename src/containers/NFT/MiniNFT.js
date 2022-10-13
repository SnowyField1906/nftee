import { useState } from "react"
import User from "./components/User"
import Price from "./components/Price"
import Add from "./components/Add"
import AddToCart from "./components/AddToCart"
import AddToCollection from "./components/AddToCollection"
import SendRequest from "./components/SendRequest"

function MiniNFT() {
    const [add, setAdd] = useState(false)

    const NFT = {
        address: "hxb6b5791be0b5ef67063b3c10b840fb81514db2fd",
        ipfs: "QmaJyAR9TqBv6i7UTXm5W7uDm3suc8Pp78pWrBjGazRiFP",
        price: 2000000,
        onSale: true,
        visibility: true,
        requested: [],
    }

    console.log(add)

    return (
        <div className='inline-block mx-4 rounded-lg hover:scale-105 transform duration-300 ease-in-out pt-10 select-none'>
            <div
                className="relative w-80 h-80 bg- bg-cover bg-center max-w-xs overflow-hidden rounded-lg"
                style={{
                    backgroundImage: `url(https://ipfs.io/ipfs/${NFT.ipfs})`,
                }}>
                <div className='flex justify-between absolute bottom-0 w-full h-1/4 backdrop-blur-md bg-gray-100/50 dark:bg-gray-800/50 rounded-b-lg'>
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
                                    <p className="pl-4 font-bold text-lg text-black dark:text-white">{NFT.address.slice(0, 8)}...{NFT.address.slice(-5)}</p>
                                </div>
                            </div>
                            <div className='h-10 w-[13.5rem]'>
                                <div className='pl-2 h-full w-full flex items-center'>
                                    <Price />
                                    <p className="pl-4 text-black dark:text-white">{NFT.price / 1e9}
                                        <span className="font-semibold text-teal-800 dark:text-teal-200">&nbsp;&nbsp;ICX</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                    <div className='grid justify-center justify-items-center items-center w-1/4 h-full'>
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


    )
}

export default MiniNFT
