import { useState, useEffect } from "react"
import { getPublicCollections, sortedCollections } from "../../utils/ReadonlyContracts"

import { collectionSortType, collectionFilterType } from "../../utils/constants"

import SmallCollection from "../../containers/Collection/SmallCollection"
import BigCollection from "../../containers/Collection/BigCollection"
import SortDropdown from "./../../containers/Dropdowns/SortDropdown"
import FilterDropdown from "./../../containers/Dropdowns/FilterDropdown"
import Footer from "../../containers/Navigators/Footer"


function Galleries({ account }) {
  const address = account.wallet ? account.wallet.getAddress() : account.address;

  const [collections, setCollections] = useState([])

  const [bigCollection, setBigCollection] = useState(false)
  const [collection, setCollection] = useState('');
  const [collectionInfo, setCollectionInfo] = useState([]);
  const [nfts, setNFTs] = useState([])
  const [collectionObject, setCollectionObject] = useState([])

  const [rawSort, setRawSort] = useState([0, 0])
  const [rawFilter, setRawFilter] = useState([['', ''], ['', '']])

  const [loading, setLoading] = useState(false)

  const [render, setRender] = useState(0)

  const collectionObjectAwaits = async () => {
    await sortedCollections().then((res) => {
      setCollectionObject(res)
    })
  }
  useEffect(() => {
    collectionObjectAwaits();
  }, [rawSort])

  console.log(collectionObject)


  useEffect(() => {
    const keys = Object.keys(collectionObject)
    keys.sort((a, b) => collectionObject[b][rawSort[0]] - collectionObject[a][rawSort[0]])
    rawSort[1] && keys.reverse()
    setCollections(keys.filter((key) => {
      let flag = true
      rawFilter.forEach((filter, i) => {
        if (filter[0] !== '') {
          flag = flag && collectionObject[key][i] >= filter[0];
        }
        if (filter[1] !== '') {
          flag = flag && collectionObject[key][i] <= filter[1];
        }
      })
      return flag
    }))
  }, [rawSort, rawFilter, collectionObject, render])


  return (
    <>
      {bigCollection &&
        <div className="fixed w-screen h-screen z-30 ">
          <BigCollection address={address} setBigCollection={setBigCollection} collection={collection} collectionInfo={collectionInfo} nfts={nfts} isPublic={true} />
        </div>}
      <div className='page-bg h-screen'>

        <div className='w-screen h-full fixed -z-10 bg-home-picture-1 bg-center bg-no-repeat bg-cover overflow-x-hidden'>
        </div>
        <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30 overflow-x-hidden'>
        </div>
        <div className='flex justify-self-center justify-between w-11/12 h-20 z-20 mt-20'>
          <div className='flex justify-between w-auto'>
            {
              collectionObject && Object.keys(collectionSortType).map((_, i) => {
                return (
                  <div className='w-40 h-full mx-3'>
                    <SortDropdown
                      index={i}
                      sortType={collectionSortType}
                      rawSort={rawSort}
                      setRawSort={setRawSort}
                    />
                  </div>
                )
              })
            }
          </div>

          <div className='flex justify-between w-auto'>
            {
              collectionObject && Object.keys(collectionFilterType).map((_, i) => {
                return (
                  <div className='w-40 h-full mx-3'>
                    <FilterDropdown
                      index={i}
                      filterType={collectionFilterType}
                      rawFilter={rawFilter}
                      setRawFilter={setRawFilter}
                      render={render}
                      setRender={setRender}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="content-list-view mt-20">
          {
            collections.length > 0 && collections.map((collection) => {
              return (
                <div className="flex flex-nowrap my-5 mx-3">
                  <SmallCollection collection={collection} setCollection={setCollection} setCollectionInfo={setCollectionInfo} setNFTs={setNFTs} setBigCollection={setBigCollection} isPublic={true} />
                </div>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Galleries
