import React from 'react'
import MiniNFT from '../../containers/NFT/MiniNFT'
function Home() {

  return (
    <div className='grid h-full w-full justify-items-center overflow-x-hidden'>
      <div className='w-full h-full fixed -z-20 bg-home-picture-1 bg-center bg-no-repeat bg-cover'>
      </div>
      <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30'>
      </div>

      <div className='w-[100rem] h-[30rem] relative mb-20 justify-self-center translate-y-32 bg-contain bg-center bg-no-repeat overflow-hidden bg-home-picture-1 rounded-[4rem]'>
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[6rem] font-bold text-white border-2 p-5
        drop-shadow-xl'>NFTee</p>
        <p className='absolute inset-x-0 bottom-5 text-5xl font-bold text-center text-white'>Welcome to the world of NFTs</p>
      </div>

      <div className='grid w-screen h-1/5 mt-32'>
        <p className='mb-32 text-center text-3xl font-bold text-black dark:text-white drop-shadow-xl'>Just released NFTs</p>
        <div className='my-10 place-self-center w-[90%] self-center flex overflow-x-scroll pb-5 '>
          <div className='flex flex-nowrap'></div>
          {
            [...Array(10)].map((_, i) => {
              return (
                <MiniNFT />
              )
            })
          }
        </div>
      </div>
      <div className='grid w-screen h-1/5 -translate-y-32'>
        <p className='mb-32 text-center text-3xl font-bold text-black dark:text-white drop-shadow-xl'>Best selling NFTs</p>
        <div className='my-10 place-self-center w-[90%] self-center flex overflow-x-scroll pb-5'>
          <div className='flex flex-nowrap'></div>
          {
            [...Array(10)].map((_, i) => {
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
