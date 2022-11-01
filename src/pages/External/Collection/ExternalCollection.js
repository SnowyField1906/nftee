import { useState, useEffect, useRef } from 'react';

import { getCollectionNFTs, getCollectionInfo } from '../../../utils/ReadonlyContracts';

import SmallCollection from '../../../containers/Collection/SmallCollection';
import BigCollection from '../../../containers/Collection/BigCollection';
import SmallNFT from '../../../containers/NFT/SmallNFT';
import BigNFT from '../../../containers/NFT/BigNFT';
import CollectionList from '../../../containers/Collection/CollectionList';
import EditNFT from '../../../containers/NFT/EditNFT';


function ExternalProfile({ account, target }) {
  const address = account.wallet ? account.wallet.getAddress() : account.address;

  const [editNFT, setEditNFT] = useState(false)
  const [collectionList, setCollectionList] = useState(false)

  const [bigNFT, setBigNFT] = useState(false)

  const [nft, setNFT] = useState('');

  const [nftInfo, setNFTInfo] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState([]);

  const [nfts, setNFTs] = useState([])



  const nftsAwait = async () => {
    await getCollectionNFTs(target).then((res) => {
      setNFTs(res)
    })
  }
  const infoAwait = async () => {
    await getCollectionInfo(target).then((res) => {
      setCollectionInfo(res)
    })
  }


  useEffect(() => {
    infoAwait();
    nftsAwait();
  }, [])


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

      <div className='page-bg h-screen  main-overflow select-none'>
        <div className='w-screen h-full fixed -z-10 bg-home-picture-1 bg-center bg-no-repeat bg-cover overflow-x-hidden'>
        </div>
        <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30 overflow-x-hidden'>

        </div>
        <div className="content-board-view pt-36">
          {
            nfts.map((nft) => {
              return (
                <div className="grid justify-items-center place-items-center ">
                  <SmallNFT address={address} nft={nft} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} setEditNFT={setEditNFT} setCollectionList={setCollectionList} />
                </div>
              )
            })
          }
        </div>
      </div>
    </>

  )
}

export default ExternalProfile
