import { useState, useEffect } from "react"
import { getNFTInfo, getNFTRequests, getPublicNFTs, sortedNFTs } from "../../utils/ReadonlyContracts"
import { nftSortType, nftFilterType } from "../../utils/constants"

import SmallNFT from "../../containers/NFT/SmallNFT"
import BigNFT from "../../containers/NFT/BigNFT"
import EditNFT from "../../containers/NFT/EditNFT"
import CollectionList from "../../containers/Collection/CollectionList"

import SortDropdown from "./../../containers/Dropdowns/SortDropdown"
import FilterDropdown from "./../../containers/Dropdowns/FilterDropdown"



function Explore({ address }) {
  const [bigNFT, setBigNFT] = useState(false)
  const [editNFT, setEditNFT] = useState(false)
  const [collectionList, setCollectionList] = useState(false)
  const [nftInfo, setNFTInfo] = useState([]);
  const [nft, setNFT] = useState('');
  const [nfts, setNFTs] = useState([]);
  const [nftObject, setNFTObject] = useState([])

  const [rawSort, setRawSort] = useState([0, 0])
  const [rawFilter, setRawFilter] = useState([-1, -1, -1, -1], [-1, -1, -1, -1])

  const [loading, setLoading] = useState(false)

  const nftObjectAwaits = async () => {
    await sortedNFTs().then((res) => {
      setNFTObject(res)
    })
  }
  useEffect(() => {
    nftObjectAwaits();
  }, [rawSort])

  console.log(nftObject)

  useEffect(() => {
    const keys = Object.keys(nftObject)
    setNFTs(keys.sort((a, b) => nftObject[b][rawSort[0]] - nftObject[a][rawSort[0]]))
    rawSort[1] && setNFTs(nfts.reverse())
  }, [rawSort, nftObject])


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
      {loading ?
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
        :

        <div className='page-bg h-screen'>
          <div className='flex justify-self-center justify-between w-11/12 h-20 z-10'>
            <div className='flex justify-between w-auto'>
              {
                nftObject && Object.keys(nftSortType).map((_, i) => {
                  return (
                    <div className='w-40 h-full mx-3'>
                      <SortDropdown
                        index={i}
                        sortType={nftSortType}
                        rawSort={rawSort}
                        setRawSort={setRawSort}
                      />
                    </div>
                  )
                })
              }
            </div>

            <div className='flex justify-between w-auto'>
              {/* {
                nftObject && Object.keys(nftFilterType).map((_, i) => {
                  return (
                    <div className='w-40 h-full mx-3'>
                      <FilterDropdown
                        index={i}
                        filterType={nftFilterType}
                        rawFilter={rawFilter}
                        setRawFilter={setRawFilter}
                      />
                    </div>
                  )
                })
              } */}
            </div>
          </div>

          <div className="content-board-view mt-20">
            {
              nfts.length > 0 && nfts.map((nft) => {
                return (
                  <SmallNFT address={address} nft={nft} setNFT={setNFT} nftInfo={nftInfo} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} setEditNFT={setEditNFT} setCollectionList={setCollectionList} />
                )
              })
            }
          </div>
        </div>
      }
    </>
  )
}

export default Explore
