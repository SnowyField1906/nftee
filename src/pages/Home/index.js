import { useState, useEffect } from 'react';


import { getPublicNFTs, sortedNFTs } from '../../utils/ReadonlyContracts';

import SmallNFT from '../../containers/NFT/SmallNFT'
import BigNFT from '../../containers/NFT/BigNFT';
import EditNFT from '../../containers/NFT/EditNFT';
import CollectionList from '../../containers/Collection/CollectionList';

function Home({ address }) {
  const [collectionList, setCollectionList] = useState(false)
  const [editNFT, setEditNFT] = useState(false)
  const [bigNFT, setBigNFT] = useState(false)
  const [nft, setNFT] = useState('');
  const [nftInfo, setNFTInfo] = useState([]);
  const [nfts, setNFTs] = useState([])
  const [nftObject, setNFTObject] = useState([])


  useEffect(() => {
    const nftsAwait = async () => {
      await sortedNFTs().then((res) => {
        setNFTObject(res)
      })
    }
    nftsAwait();
  }, [bigNFT, editNFT, collectionList, nft])


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
          <CollectionList address={address} nft={nft} setCollectionList={setCollectionList} />
        </div>}
      <div className='grid h-max w-screen justify-items-center overflow-x-hidden'>
        <div className='w-screen h-full fixed -z-10 bg-home-picture-1 bg-center bg-no-repeat bg-cover overflow-x-hidden'>
        </div>
        <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30 overflow-x-hidden'>
        </div>

        <div className='w-[90rem] h-[27rem] relative mb-20 justify-self-center translate-y-32 bg-contain bg-center bg-no-repeat overflow-hidden bg-home-picture-1 rounded-[4rem]'>
          <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[5rem] font-bold text-white border-2 p-5
        drop-shadow-xl'>NFTee</p>
          <p className='absolute inset-x-0 bottom-5 text-4xl font-bold text-center text-white'>Welcome to the world of NFTs</p>
        </div>

        <div className='grid w-screen mt-36'>
          <p className='text-huge mb-2'>Just released NFTs</p>
          <div className='content-list-view bg-white/50 dark:bg-black/50 rounded-xl'>
            {
              nftObject.length !== 0 && Object.keys(nftObject).sort((a, b) => nftObject[b][0] - nftObject[a][0]).slice(0, 5).map((nft) => {
                return (
                  <SmallNFT address={address} nft={nft} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} setEditNFT={setEditNFT} setCollectionList={setCollectionList} />
                )
              })
            }
          </div>
        </div>
        <div className='grid w-screen mt-10'>
          <p className='text-huge mb-2'>Best selling NFTs</p>
          <div className='content-list-view bg-white/50 dark:bg-black/50 rounded-xl'>
            {
              nftObject.length !== 0 && Object.keys(nftObject).sort((a, b) => nftObject[b][3] - nftObject[a][3]).slice(0, 5).map((nft) => {
                return (
                  <SmallNFT address={address} nft={nft} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} setEditNFT={setEditNFT} setCollectionList={setCollectionList} />
                )
              })
            }
          </div>
        </div>
        <div className='grid w-screen mt-10'>
          <p className='text-huge mb-2'>Hot NFTs</p>
          <div className='content-list-view bg-white/50 dark:bg-black/50 rounded-xl'>
            {
              nftObject.length !== 0 && Object.keys(nftObject).sort((a, b) => nftObject[b][2] - nftObject[a][2]).slice(0, 5).map((nft) => {
                return (
                  <SmallNFT address={address} nft={nft} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} setEditNFT={setEditNFT} setCollectionList={setCollectionList} />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
