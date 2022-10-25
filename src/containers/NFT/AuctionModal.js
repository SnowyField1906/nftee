import { useState } from 'react';
import { startAuction } from '../../utils/TransactionContracts';

import { timeConventer, dateConventer } from './../../utils/helpers';

function AuctionModal({ address, isOwner, nft, auctionInfo, requests, setAuctionModal }) {
    const [duration, setDuration] = useState(0);

    return (
        <div className='fixed mt-20 w-[60%] h-[70%] top-[10%] left-[20%] rounded-2xl z-50 backdrop-lg'>
            <svg className="absolute top-0 right-0 m-4 h-8 w-8 fill-black dark:fill-white cursor-pointer z-50" onClick={() => setAuctionModal(false)}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
            </svg>

            <div className="flex h-full">

                <div className='flex-col h-full w-5/12 border-r border-black dark:border-white'>
                    <p className='grid place-content-center text-huge h-[10%] w-full place-self-center border-b-2 border-black/50 dark:border-white/50'>Requests</p>
                    <div className='flex-col h-[35%]'>
                        {
                            requests.map((request, i) => {
                                return (
                                    <p className='ml-8 mt-5 cursor-pointer hover:underline text-black dark:text-white'>{i + 1}. &nbsp;{request}</p>
                                )
                            })
                        }
                    </div>
                    <p className='grid place-content-center text-huge h-[10%] w-full place-self-center border-b-2 border-black/50 dark:border-white/50'>History</p>
                    <div className='flex-col h-[35%]'>
                        {
                            requests.map((request, i) => {
                                return (
                                    <p className='ml-8 mt-5 text-black dark:text-white'>{i + 1}.&nbsp;
                                        <span className='cursor-pointer hover:underline '>{request.slice(0, 15)}...{request.slice(-10)}</span>&nbsp;bidded 10 ICX
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex-col h-full w-7/12'>
                    <p className='grid place-content-center text-huge h-[10%] w-full place-self-center border-b-2 border-black/50 dark:border-white/50'>Auction's information</p>
                    <div className='grid h-[90%]'>
                        <div className='h-[17.5rem] w-11/12 justify-self-center mt-5'>
                            <div className='flex h-14 rounded-xl '>
                                <div className="w-1/4 h-14 flex place-items-center rounded-tl-xl border-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-4 font-semibold text-black dark:text-white'>First request</p>
                                </div>
                                <div className="flex justify-between place-items-center w-4/5 h-14 button-light rounded-tr-xl border-y-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="text-black dark:text-white">
                                        {dateConventer(auctionInfo[0])}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-4 font-semibold text-black dark:text-white'>Start time</p>
                                </div>
                                <div className="flex w-4/5 h-14 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="text-black dark:text-white">
                                        {dateConventer(auctionInfo[1])}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-4 font-semibold text-black dark:text-white'>Duration</p>
                                </div>
                                <div className="flex w-4/5 h-14 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="text-black dark:text-white">
                                        {timeConventer(auctionInfo[2])}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-4 font-semibold text-black dark:text-white'>Last bid</p>
                                </div>
                                <div className="flex w-4/5 h-14 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="text-black dark:text-white">
                                        {auctionInfo[3] / 1e18} ICX
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 rounded-bl-xl border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-4 font-semibold text-black dark:text-white'>Last bidder</p>
                                </div>
                                <div className="flex w-4/5 h-14 justify-between place-items-center button-light rounded-br-xl border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="cursor-pointer text-black dark:text-white hover:underline">
                                        {auctionInfo[4]}
                                    </p>
                                    <svg className="w-7 h-7 cursor-pointer fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                        onClick={() => { navigator.clipboard.writeText(auctionInfo[4]) }}
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {isOwner ?
                            <div className='h-56 w-3/5 place-content-center justify-self-center mt-20'>
                                <div className="grid overflow-hidden grid-cols-5 grid-rows-5 gap-2">
                                    <p className="text-high text-left place-self-center">Duration:</p>
                                    <input className="col-start-2 col-end-6 place-self-center w-5/6 h-14 px-4 transition input"
                                        type="number" placeholder="Duration in seconds"
                                        defaultValue={auctionInfo[2]}
                                        onInput={(e) => { setDuration(+e.target.value) }} />
                                    <button onClick={() => startAuction(address, nft, duration)}
                                        className="col-start-2 col-end-5 place-self-center place-items-center  w-full h-12 button-medium rounded-md text-black dark:text-white font-medium cursor-pointer border mt-3">Start auction now</button>
                                </div>
                            </div>
                            :
                            <div className='h-56 w-3/5 place-content-center justify-self-center mt-20'>
                                <div className="grid overflow-hidden grid-cols-5 grid-rows-5 gap-2">
                                    <p className="text-high text-left place-self-center">Bid:</p>
                                    <input className="col-start-2 col-end-6 place-self-center w-5/6 h-14 px-4 transition input"
                                        type="number" placeholder="Price"
                                    // onChange={(e) => { if (+e.target.value !== 0) setCreateNFTParams({ ...createNFTParams, _price: +e.target.value }) }}
                                    />
                                    <button className="col-start-2 col-end-5 place-self-center place-items-center  w-full h-12 button-medium rounded-md text-black dark:text-white font-medium cursor-pointer border mt-3">Enter</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuctionModal
