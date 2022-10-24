import { useEffect, useState } from "react"
import { findPublicGateWay } from "../../utils/constants"
import { dateConventer } from "../../utils/helpers"
import { addToCart, sendRequest, deleteNFT, startAuction } from "../../utils/TransactionContracts"
import { getAuctionInfo, getNFTRequests } from "../../utils/ReadonlyContracts"

import CollectionList from "../Collection/CollectionList"
import AuctionModal from "./AuctionModal"

import AddToCart from "./components/AddToCart"
import AddToCollection from "./components/AddToCollection"
import SendRequest from "./components/SendRequest"
import Approve from "./components/Approve"
import Reject from "./components/Reject"
import Auction from "./components/Auction"
import Delete from "../Collection/components/Delete"
import Edit from "../Collection/components/Edit"
import EditNFT from "./EditNFT"
import Expand from "./components/Expand"



function BigNFT({ address, nft, nftInfo, setBigNFT }) {
    const [editNFT, setEditNFT] = useState(false)

    const [collectionList, setCollectionList] = useState(false)
    const [requests, setRequests] = useState([])
    const [auctionInfo, setAuctionInfo] = useState([])
    const [auctionModal, setAuctionModal] = useState(false)

    useEffect(() => {
        const requestsAwait = async () => {
            await getNFTRequests(nft).then((res) => {
                setRequests(res)
            })
        }
        requestsAwait()

        const auctionAwait = async () => {
            await getAuctionInfo(nft).then((res) => {
                setAuctionInfo(res)
            })
        }
        auctionAwait()

    }, [collectionList, auctionModal, editNFT, nft, setBigNFT])

    const [now, setNow] = useState(Math.floor(Date.now() / 1000))
    setTimeout(() => {
        setNow(now + 1)
    }, 1000);

    return (
        <>
            {collectionList &&
                <div className="fixed w-screen h-screen z-40">
                    <CollectionList address={address} nft={nft} setCollectionList={setCollectionList} />
                </div>}

            {editNFT &&
                <div className="fixed w-screen h-screen z-50">
                    <EditNFT address={address} nft={nft} nftInfo={nftInfo} setEditNFT={setEditNFT} />
                </div>}

            {auctionModal &&
                <div className="fixed w-screen h-screen z-50">
                    <AuctionModal address={address} nft={nft} auctionInfo={auctionInfo} requests={requests} setAuctionModal={setAuctionModal} />
                </div>}

            <div className='fixed mt-20 w-[80vw] h-[80vh] top-[5vh] left-[10vw] rounded-2xl z-30 backdrop-lg'>
                <svg className="absolute top-0 right-0 m-4 h-8 w-8 fill-black dark:fill-white cursor-pointer z-50" onClick={() => setBigNFT(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>

                <div className="absolute top-0 right-0 w-full h-full grid grid-cols-2 grid-rows-1">
                    <div className="h-full border-r border-black/30 dark:border-white/30 bg- bg-contain bg-no-repeat bg-center overflow-hidden rounded-y-lg rounded-l-lg"
                        style={{
                            backgroundImage: `url(${findPublicGateWay(nft)})`,
                        }}>
                    </div>

                    <div className="h-full w-full grid place-items-center">
                        <div className="h-50 self-center w-5/6 grid">
                            <div className='flex h-12 rounded-xl '>
                                <div className="w-1/4 h-12 flex place-items-center rounded-tl-xl border-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Owner</p>
                                </div>
                                <div className="flex justify-between place-items-center w-3/4 h-12 button-light rounded-tr-xl border-y-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 cursor-pointer text-black dark:text-white hover:underline">
                                        {nftInfo[0]}
                                    </p>
                                    <svg className="w-7 h-7 mr-4 cursor-pointer fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                        onClick={() => { navigator.clipboard.writeText(nftInfo[0]) }}
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-12 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Price</p>
                                </div>
                                <div className="flex w-3/4 h-12 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {nftInfo[1] / 1e18} ICX
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-12 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Visibility</p>
                                </div>
                                <div className="flex w-3/4 h-12 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {nftInfo[3] === 'true' ? 'Public' : 'Private'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-12 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Status</p>
                                </div>
                                <div className="flex w-3/4 h-12 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {nftInfo[4] === 'true' ? "On Sale" : "Not On Sale"}

                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-12 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Purchase times</p>
                                </div>
                                <div className="flex w-3/4 h-12 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {nftInfo[5]}

                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-12 w-1/4 rounded-bl-xl border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Date created</p>
                                </div>
                                <div className="flex w-3/4 h-12 justify-between place-items-center button-light rounded-br-xl border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {dateConventer(nftInfo[6])}

                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-3/4 h-36 button-light rounded-lg">
                            <div className="pl-4 border-b-2 pb-2 border-black/30 dark:border-white/30 flex justify-between">
                                <p className='text-medium place-self-center'>Description</p>
                                <div className="flex place-items-center button-medium rounded-xl">
                                    <Expand />
                                    <p className='text-medium text-sm pl-4 cursor-pointer'>Expand</p>
                                </div>
                            </div>
                            <div className="w-full pl-4 pt-2 text-black dark:text-white">
                                {nftInfo[2]}
                            </div>
                        </div>
                        <div className="w-3/4 h-36 button-light rounded-lg">
                            <div className="pl-4 border-b-2 pb-2 border-black/30 dark:border-white/30 flex justify-between">
                                <p className='text-medium place-self-center'>Requests</p>
                                <div className="flex place-items-center rounded-xl">
                                    {auctionInfo[0] && requests.length < 2 && <p className='pl-4 text-medium'>Pending: {+auctionInfo[0] + 86400 - now}</p>}
                                    {requests.length >= 2 && <p className='pl-4 text-medium'>Start after: {auctionInfo[1] - now}</p>}
                                </div>
                                <div className="flex place-items-center button-medium rounded-xl">
                                    <Expand />
                                    <p className='text-medium text-sm pl-4 cursor-pointer'>Expand</p>
                                </div>
                            </div>
                            <div className="w-full">
                                {requests.slice(0, 2).map((request) => {
                                    return (
                                        <div className="flex justify-between place-items-center mt-2 w-full ">
                                            <p className='pl-8 cursor-pointer hover:underline text-black dark:text-white'>{request}</p>
                                            {address === nftInfo[0] &&
                                                <div className="flex justify-around place-items-center w-1/4 ">
                                                    <Approve />
                                                    <Reject />
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                                {requests.length > 2 && <p className='pl-8 mt-2 text-center w-3/4 text-black dark:text-white'>+{requests.length - 2} more</p>}
                            </div>
                        </div>
                        <div className=" h-28 w-3/4 grid grid-rows-2 grid-cols-2 place-items-center">
                            <div className='flex h-12 w-11/12 button-medium rounded-xl cursor-pointer   '
                                onClick={() => setCollectionList(true)}>
                                <div className="self-center mx-1">
                                    <AddToCollection />
                                </div>
                                <p className=" text-medium w-5/6 text-center justify-self-center self-center">Add to collection</p>
                            </div>
                            {address === nftInfo[0] ?
                                <div className='flex h-12 w-11/12 button-medium rounded-xl cursor-pointer '
                                    onClick={() => setEditNFT(true)}>
                                    <div className="self-center mx-1">
                                        <Edit />
                                    </div>
                                    <p className="text-medium w-5/6 text-center justify-self-center self-center">Edit information</p>
                                </div>
                                :
                                <div className='flex h-12 w-11/12 button-medium rounded-xl cursor-pointer'
                                    onClick={() => { addToCart(address, nft) }}>
                                    <div className="self-center mx-1">
                                        <AddToCart />
                                    </div>
                                    <p className="text-medium w-5/6 text-center justify-self-center self-center">Add to cart</p>
                                </div>

                            }
                            {requests.length >= 2 ?
                                <div className='flex h-12 w-11/12 button-medium rounded-xl cursor-pointer '
                                    onClick={() => setAuctionModal(true)}>
                                    <div className="self-center mx-1">
                                        <Auction />
                                    </div>
                                    <p className="text-medium w-5/6 text-center justify-self-center self-center">{address === nftInfo[0] ? "Start auction" : "View auction detail"}</p>
                                </div>
                                :
                                <div className='flex h-12 w-11/12 button-medium-disabled rounded-xl  '>
                                    <div className="self-center mx-1">
                                        <Auction />
                                    </div>
                                    <p className="text-medium w-5/6 text-center justify-self-center self-center">{address === nftInfo[0] ? "Start auction" : "View auction detail"}</p>
                                </div>
                            }
                            {address === nftInfo[0] ?
                                <div className='flex h-12 w-11/12 button-medium rounded-xl cursor-pointer '
                                    onClick={() => deleteNFT(address, nft)}>
                                    <div className="self-center mx-1">
                                        <Delete />
                                    </div>
                                    <p className="text-medium w-5/6 text-center justify-self-center self-center">Delete NFT</p>
                                </div>
                                :
                                nftInfo[4] === 'true' && !requests.includes(address) ?
                                    <div className='flex h-12 w-11/12 button-medium rounded-xl cursor-pointer '
                                        onClick={() => sendRequest(address, nft)}>
                                        <div className="self-center mx-1">
                                            <SendRequest />
                                        </div>
                                        <p className="text-medium w-5/6 text-center justify-self-center self-center">Send purchase request</p>
                                    </div>
                                    :
                                    <div className='flex h-12 w-11/12 button-medium-disabled rounded-xl'>
                                        <div className="self-center mx-1">
                                            <SendRequest />
                                        </div>
                                        <p className=" text-medium w-5/6 text-center justify-self-center self-center">Send purchase request</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default BigNFT
