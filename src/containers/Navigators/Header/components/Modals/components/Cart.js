import { useState, useEffect } from 'react'

import { getCollectionPublicNFTs, balance } from '../../../../../../utils/ReadonlyContracts'

import NFTCard from '../../../../../NFT/NFTCard'


function Cart({ address, active, setOpen, setNFT, setNFTInfo, setBigNFT }) {
    const [nfts, setNFTs] = useState([])
    const [balance, setBalance] = useState(0)


    const collectionsAwait = async () => {
        await getCollectionPublicNFTs(address + "/Cart").then((res) => {
            setNFTs(res)
        })
    }
    const balanceAwait = async () => {
        await balance(address).then((res) => {
            setBalance(res)
        })
    }
    useEffect(() => {
        collectionsAwait();
        balanceAwait();
    }, [active, setOpen, setNFT, setBigNFT])

    return (
        <div className={`${active ? "h-screen" : "h-0"} w-[27rem] fixed right-8 mt-14
        transform duration-300 ease-in-out select-none
        rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-md`} >
            <div className={active ? "h-full" : "hidden"}>

                <div className='flex justify-between w-4/5 py-5 border-b-[1px] border-slate-300 dark:border-slate-700 mx-auto place-items-center'>
                    <p className='ml-5 font-bold text-2xl text-slate-900 dark:text-slate-100'>Your Cart</p>
                    <p className='font-semibold text-slate-900 dark:text-slate-100 mr-5'>Balance: {balance}</p>
                </div>
                <div className='flex-initial gap-2 w-full h-full'>
                    {
                        nfts ? nfts.map((nft) => {
                            return (
                                <div className='w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global'>
                                    <NFTCard address={address} setOpen={setOpen} nft={nft} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} />
                                </div>
                            )
                        })
                            : null
                    }

                </div>

            </div>
        </div>
    )
}

export default Cart
