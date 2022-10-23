import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import IconService from 'icon-sdk-js';

import { getCollectionNFTs, getUserCustomCollections } from '../../utils/ReadonlyContracts';

import SmallCollection from '../../containers/Collection/SmallCollection';
import BigCollection from '../../containers/Collection/BigCollection';
import SmallNFT from '../../containers/NFT/SmallNFT';
import BigNFT from '../../containers/NFT/BigNFT';
import CollectionList from '../../containers/Collection/CollectionList';
import EditNFT from '../../containers/NFT/EditNFT';

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')
const iconService = new IconService(httpProvider);


SwiperCore.use([Navigation, Pagination]);


function Profile({ address }) {
  const [editNFT, setEditNFT] = useState(false)
  const [collectionList, setCollectionList] = useState(false)

  const [bigNFT, setBigNFT] = useState(false)
  const [bigCollection, setBigCollection] = useState(false)

  const [nft, setNFT] = useState('');
  const [collection, setCollection] = useState('');

  const [nftInfo, setNFTInfo] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState([]);

  const [nfts, setNFTs] = useState([])
  const [owningNFTs, setOwningNFTs] = useState([])



  const [balance, setBalance] = useState('')
  const [customCollections, setCustomCollections] = useState([])


  useEffect(() => {
    const getBalance = async () => {
      const balance = await iconService.getBalance(address).execute();
      const balanceValue = (IconService.IconAmount.of(balance, IconService.IconAmount.Unit.ICX) / 10e17).toString();
      setBalance(balanceValue)
    }
    getBalance();

    const customCollectionsAwait = async () => {
      await getUserCustomCollections(address).then((res) => {
        setCustomCollections(res)
      })
    }
    customCollectionsAwait();

    const nftsAwait = async () => {
      await getCollectionNFTs(address + "/Owning").then((res) => {
        console.log(res)
        setOwningNFTs(res)
      })
    }
    nftsAwait();
  }, [editNFT, collectionList, bigNFT, bigCollection, nft, collection])


  console.log(nft)


  if (!address) {
    return (
      <Navigate to="/NFTee" />
    )
  }

  return (
    <>
      {bigNFT &&
        <div className="fixed w-screen h-screen z-30">
          <BigNFT address={address} nft={nft} nftInfo={nftInfo} setBigNFT={setBigNFT} />
        </div>}
      {editNFT &&
        <div className="fixed w-screen h-screen z-50">
          <EditNFT address={address} nft={nft} nftInfo={nftInfo} setEditNFT={setEditNFT} />
        </div>}
      {collectionList &&
        <div className="fixed w-screen h-screen z-40">
          <CollectionList address={address} nft={nft} collections={customCollections} setCollectionList={setCollectionList} />
        </div>}
      {bigCollection &&
        <div className="fixed w-screen h-screen z-30">
          <BigCollection address={address} setBigCollection={setBigCollection} collection={collection} collectionInfo={collectionInfo} nfts={nfts} isPublic={false} />
        </div>}

      <div className='page-bg h-screen place-items-center'>
        <div className="grid px-10 py-32 w-full">
          <p className="text-huge">{address}</p>
          <p className="text-huge">{balance}</p>
        </div>
        <div className="">
          {!owningNFTs || !owningNFTs.length ?
            <p className="text-huge">Create your first NFTs</p>
            :
            <div className="grid w-full justify-items-center place-items-center">
              <p className="text-huge mb-5">Your owning NFTs</p>
              <Swiper
                slidesPerView={owningNFTs.length > 5 ? 5 : owningNFTs.length}
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
                  owningNFTs.map((nft) => {
                    return (
                      <SwiperSlide>
                        <div className="grid justify-items-center place-items-center ">
                          <SmallNFT address={address} nft={nft} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} setEditNFT={setEditNFT} setCollectionList={setCollectionList} />
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
                          <SmallCollection collection={collection} setCollection={setCollection} setNFTs={setNFTs} setCollectionInfo={setCollectionInfo} setBigCollection={setBigCollection} />
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
    </>

  )
}

export default Profile
