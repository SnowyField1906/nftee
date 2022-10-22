import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import IconService from 'icon-sdk-js';
import { getUserCollections, getCollectionNFTs, getUserCustomCollections } from '../../utils/ReadonlyContracts';
import SmallCollection from '../../containers/Collection/SmallCollection';
import SmallNFT from '../../containers/NFT/SmallNFT';

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')
const iconService = new IconService(httpProvider);


SwiperCore.use([Navigation, Pagination]);


function Profile({ address }) {
  const [balance, setBalance] = useState('')
  const [customCollections, setCustomCOllections] = useState([])
  const [nfts, setNFTs] = useState([])


  useEffect(() => {
    const getBalance = async () => {
      const balance = await iconService.getBalance(address).execute();
      const balanceValue = (IconService.IconAmount.of(balance, IconService.IconAmount.Unit.ICX) / 10e17).toString();
      setBalance(balanceValue)
    }
    getBalance();

    const customCollectionsAwait = async () => {
      await getUserCustomCollections(address).then((res) => {
        setCustomCOllections(res)
      })
    }
    customCollectionsAwait();

    const nftsAwait = async () => {
      await getCollectionNFTs(address + "/Owning").then((res) => {
        setNFTs(res)
      })
    }
    nftsAwait();
  }, [])


  if (address === false) {
    return (
      <Navigate to="/NFTee" />
    )
  }

  return (
    <div className='page-bg h-screen place-items-center'>
      <div className="grid px-10 py-32 w-full">
        <p className="text-huge">{address}</p>
        <p className="text-huge">{balance}</p>
      </div>
      <div className="">
        {!nfts || !nfts.length ?
          <p className="text-huge">Create your first NFTs</p>
          :
          <div className="grid w-full justify-items-center place-items-center">
            <p className="text-huge mb-5">Your owning NFTs</p>
            <Swiper
              slidesPerView={nfts.length > 5 ? 5 : nfts.length}
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
              className="mySwiper2 bg-white/30 dark:bg-black/30 rounded-2xl p-5 w-screen"
            >
              {
                nfts.map((nft) => {
                  return (
                    <SwiperSlide>
                      <div className="grid justify-items-center place-items-center ">
                        <SmallNFT address={address} nft={nft} />
                      </div>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>

          </div>
        }
      </div>
      <div className="mt-20">
        {!customCollections || !customCollections.length ?
          <p className="text-huge ">Create your first custom collection</p>
          :
          <div className="grid w-full justify-items-center place-items-center">
            <p className="text-huge mb-5">Your custom collections</p>
            <Swiper
              slidesPerView={customCollections.length > 5 ? 5 : customCollections.length}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper2 bg-white/30 dark:bg-black/30 rounded-2xl w-screen"
            >
              {
                customCollections.map((collection) => {
                  return (
                    <SwiperSlide>
                      <div className="grid place-items-center py-10">
                        <SmallCollection address={address} collection={collection} />
                      </div>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>

          </div>
        }
      </div>
    </div>
  )
}

export default Profile
