import { useState, useEffect } from 'react'

import { getCollectionPublicNFTs, balance, payableBalance } from '../../../../../../utils/ReadonlyContracts'

import NFTCard from '../../../../../NFT/NFTCard'


function Cart({ address, active, setOpen, setNFT, setNFTInfo, setBigNFT }) {
    const [nfts, setNFTs] = useState([])
    const [total, setTotal] = useState(0)
    const [payable, setPayable] = useState(0)


    const collectionsAwait = async () => {
        await getCollectionPublicNFTs(address + "/Cart").then((res) => {
            setNFTs(res)
        })
    }
    const payableAwait = async () => {
        await payableBalance(address).then((res) => {
            setPayable(res)
        })
    }
    const balanceAwait = async () => {
        await balance(address).then((res) => {
            setTotal(res)
        })
    }
    useEffect(() => {
        collectionsAwait();
        balanceAwait();
        payableAwait();
    }, [setOpen, setNFT, setBigNFT])

    return (
        <div className={`${active ? "h-screen" : "h-0"} w-[27rem] fixed right-8 mt-14
        transform duration-300 ease-in-out select-none
        rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-md`} >
            <div className={active ? "h-full" : "hidden"}>

                <div className='flex justify-between w-4/5 py-5 border-b-[1px] border-slate-300 dark:border-slate-700 mx-auto place-items-center'>
                    <p className='ml-5 font-bold text-2xl text-slate-900 dark:text-slate-100'>Your Cart</p>
                    <div className='w-fit grid grid-cols-2 grid-rows-2 mr-3'>
                        <p className='font-semibold text-slate-900 dark:text-slate-100'>Total:&nbsp;</p>
                        <p className='font-semibold text-slate-900 dark:text-slate-100'>{(total / 1e18).toFixed(2)}</p>
                        <p className='font-semibold text-slate-900 dark:text-slate-100'>Payable:&nbsp;</p>
                        <p className='font-semibold text-slate-900 dark:text-slate-100'>{(payable / 1e18).toFixed(2)}</p>
                    </div>
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
