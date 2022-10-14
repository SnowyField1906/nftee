import React from 'react'
import MiniNFT from '../../containers/NFT/MiniNFT'
function Home() {

  return (
    <div className='grid h-max w-screen justify-items-center overflow-x-hidden'>
      <div className='w-screen h-full fixed -z-20 bg-home-picture-1 bg-center bg-no-repeat bg-cover overflow-x-hidden'>
      </div>
      <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30 overflow-x-hidden'>
      </div>

      <div className='w-[90rem] h-[27rem] relative mb-20 justify-self-center translate-y-32 bg-contain bg-center bg-no-repeat overflow-hidden bg-home-picture-1 rounded-[4rem]'>
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[5rem] font-bold text-white border-2 p-5
        drop-shadow-xl'>NFTee</p>
        <p className='absolute inset-x-0 bottom-5 text-4xl font-bold text-center text-white'>Welcome to the world of NFTs</p>
      </div>

      <div className='grid w-screen h-1/5 mt-36'>
        <p className='text-center text-3xl font-bold text-black dark:text-white drop-shadow-xl'>Just released NFTs</p>
        <div className='mt-5 mb-20 place-self-center w-11/12 self-center flex pb-5 '>
          <div className='flex flex-nowrap'></div>
          {
            [...Array(5)].map((_, i) => {
              return (
                <MiniNFT />
              )
            })
          }
        </div>
      </div>
      <div className='grid w-screen h-1/5'>
        <p className='text-center text-3xl font-bold text-black dark:text-white drop-shadow-xl'>Best selling NFTs</p>
        <div className='mt-5 mb-20 place-self-center w-11/12 self-center flex pb-5'>
          <div className='flex flex-nowrap'></div>
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

export default Home
