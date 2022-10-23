import { useState, useEffect } from "react"
import { getNFTInfo, getNFTRequests, getPublicNFTs } from "../../utils/ReadonlyContracts"

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
  const [nfts, setNFTs] = useState([])
  const [nftObject, setNFTObject] = useState({})

  const [sort, setSort] = useState('Newest')
  const [filter, setFilter] = useState([])

  const sortByDateCreated = ['Newest', 'Oldest']
  const sortByRequests = ['Most requests', 'Least requests'];
  const sortByPrice = ['Highest price', 'Lowest price'];
  const sortByPurchaseTimes = ['Best selling', 'Flop'];


  const filterDateCreated = ["Today", "This week", "This month", "This year"]
  const filterByRequests = ["No one", "1 - 2", "2 - 5", "More than 5"]
  const filterByPrice = ["On sale", "Not on sale", "Lower than 1", "1 - 10", "10 - 25", "Higher than 25"]
  const filterByPurchaseTimes = ["Not yet", "1 - 2", "2 - 5", "More than 25"]

  const [loading, setLoading] = useState(true)

  console.log(sort, filter)


  const nftsAwait = async () => {
    await getPublicNFTs().then((res) => {
      setNFTs(res)
      res.map(async (nft) => {
        await getNFTRequests(nft).then(async (res) => {
          await getNFTInfo(nft).then((res2) => {
            setNFTObject(prevState => ({
              ...prevState,
              [nft]: {
                requests: res,
                price: res2
              }
            }))
          })
        })
      })
    })
  }

  console.log(nftObject)

  useEffect(() => {
    nftsAwait();
  }, [])

  console.log(nfts)
  useEffect(() => {
    setLoading(true)
    switch (sort) {
      case 'Newest':
        setNFTs(nfts);
        break;
      case 'Oldest':
        setNFTs(Array.from(nfts).reverse());
        break;
      case 'Most requests':
        setNFTs(nfts.sort((a, b) => nftObject[a].requests.length - nftObject[b].requests.length));
        break;
      case 'Least requests':
        setNFTs(nfts.sort((a, b) => nftObject[b].requests.length - nftObject[a].requests.length));
        break;
      case 'Highest price':
        setNFTs(nfts.sort((a, b) => +nftObject[b].price - nftObject[a].price));
        break;
      case 'Lowest price':
        setNFTs(nfts.sort((a, b) => +nftObject[b].price - nftObject[a].price));
        break;
    }
    setLoading(false)
  }, [sort])


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
              <div className='w-40 h-full mx-3'>
                <SortDropdown name="Date created" array={sortByDateCreated} sort={sort} setSort={setSort} />
              </div>
              <div className='w-40 h-full mx-3'>
                <SortDropdown name="Requests" array={sortByRequests} sort={sort} setSort={setSort} />
              </div>
              <div className='w-40 h-full mx-3'>
                <SortDropdown name="Price" array={sortByPrice} sort={sort} setSort={setSort} />
              </div>
              <div className='w-40 h-full mx-3'>
                <SortDropdown name="Purchase times" array={sortByPurchaseTimes} sort={sort} setSort={setSort} />
              </div>

            </div>

            <div className='flex justify-between w-auto'>
              <div className='w-40 h-full mx-3'>
                <FilterDropdown name="Date created" array={filterDateCreated} filter={filter} setFilter={setFilter} />
              </div>
              <div className='w-40 h-full mx-3'>
                <FilterDropdown name="Requests" array={filterByRequests} filter={filter} setFilter={setFilter} />
              </div>
              <div className='w-40 h-full mx-3'>
                <FilterDropdown name="Price" array={filterByPrice} filter={filter} setFilter={setFilter} />
              </div>
              <div className='w-40 h-full mx-3'>
                <FilterDropdown name="Purchase times" array={filterByPurchaseTimes} filter={filter} setFilter={setFilter} />
              </div>
            </div>
          </div>

          <div className="content-board-view mt-20">
            {
              nfts.map((nft) => {
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
