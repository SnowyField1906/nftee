import { useState, useEffect } from "react"
import { getUserCollections } from "../../utils/ReadonlyContracts"

import SmallCollection from "../../containers/Collection/SmallCollection"
import SortDropdown from "./../../containers/Dropdowns/SortDropdown"
import FilterDropdown from "./../../containers/Dropdowns/FilterDropdown"


function Galleries({ address }) {
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const collectionsAwait = async () => {
      await getUserCollections("hxf9bfff62e92b621dfd823439c822d73c7df8e698").then((res) => {
        setCollections(res)
      })
    }
    collectionsAwait();
  }, [])

  const [sort, setSort] = useState('Newest')

  const [filter, setFilter] = useState([])

  const sortByTime = ['Newest', 'Oldest']
  const sortByVolume = ['Most NFTs', 'Least NFTs'];

  const filterByVolume = ["Less than 4", "4 - 10", "10 - 20", "More than 20"]
  const filterByTime = ["Today", "This week", "This month", "This year"]

  return (
    <div className='page-bg'>
      <div className='flex justify-self-center justify-between w-11/12 h-20 z-20'>
        <div className='flex justify-between w-auto'>
          <div className='w-40 h-full mx-3'>
            <SortDropdown name="Time" array={sortByTime} sort={sort} setSort={setSort} />
          </div>
          <div className='w-40 h-full mx-3'>
            <SortDropdown name="Volume" array={sortByVolume} sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className='flex justify-between w-auto'>
          <div className='w-40 h-full mx-3'>
            <FilterDropdown name="Time" array={filterByTime} filter={filter} setFilter={setFilter} />
          </div>
          <div className='w-40 h-full mx-3'>
            <FilterDropdown name="Volume" array={filterByVolume} filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>

      <div className="content-list-view mt-20">
        {
          collections.map((_, i) => {
            return (
              <div className="flex flex-nowrap my-5 mx-3">
                <SmallCollection address={address} collection={collections[i]} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Galleries
