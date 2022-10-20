import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import SmallNFT from '../../containers/NFT/SmallNFT'

SwiperCore.use([Navigation, Pagination]);


function Home({ account }) {
  const nft = "QmU7yX6TuwLbtm5rumB5oxBc6d4NGNdFgL6cEnwjVBBNJQ"
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

      <div className='grid w-screen mt-36'>
        <p className='text-huge'>Just released NFTs</p>
        <Swiper
          slidesPerView={5}
          slidesPerGroup={1}
          centeredSlides={true}
          centeredSlidesBounds={true}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper bg-white/30 dark:bg-black/30 rounded-2xl p-5 "
        >
          {
            [...Array(5)].map(() => {
              return (
                <SwiperSlide>
                  <SmallNFT account={account} nft={nft} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
      <div className='grid w-screen'>
        <p className='text-huge'>Best selling NFTs</p>
        <Swiper
          slidesPerView={5}
          slidesPerGroup={1}
          centeredSlides={true}
          centeredSlidesBounds={true}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper bg-white/30 dark:bg-black/30 rounded-2xl p-5 "
        >
          {
            [...Array(5)].map(() => {
              return (
                <SwiperSlide>
                  <SmallNFT account={account} nft={nft} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>

    </div>
  )
}

export default Home
