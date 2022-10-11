import React from 'react'
import MiniNFT from '../../containers/NFT/MiniNFT'
function index() {
  return (
    <div className='grid h-full w-full justify-items-center overflow-ellipsis'>
      <div className='w-full h-full fixed -z-20 bg-home-picture-1 bg-center bg-no-repeat bg-cover'>
      </div>
      <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30'>
      </div>

      <div className='w-[100rem] h-[30rem] relative mb-20 justify-self-center translate-y-32 bg-contain bg-center bg-no-repeat overflow-hidden bg-home-picture-1 rounded-[4rem]'>
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[6rem] font-bold text-white border-2 p-5
        drop-shadow-xl'>NFTee</p>
        <p className='absolute inset-x-0 bottom-5 text-5xl font-bold text-center text-white'>Welcome to the world of NFTs</p>
      </div>

      <div className='h-1/5 mt-24 z-30'>
        <p className='my-10 text-center text-3xl font-bold text-black dark:text-white drop-shadow-xl'>Just released NFTs</p>
        <div className='w-[90%] self-center flex justify-between snap-mandatory snap-x overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          {
            [...Array(5)].map((_, i) => {
              return (
                <MiniNFT />
              )
            })
          }
        </div>
      </div>
      <div className='h-1/5 mt-24 z-30'>
        <p className='my-10 text-center text-3xl font-bold text-black dark:text-white'>Best Selling NFTs</p>
        <div className='w-[90%] justify-self-center flex justify-between snap-mandatory snap-x overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          {
            [...Array(5)].map((_, i) => {
              return (
                <MiniNFT />
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default index
