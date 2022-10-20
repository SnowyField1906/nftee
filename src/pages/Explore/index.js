import { useState } from "react"

import SmallNFT from "../../containers/NFT/SmallNFT"
import SortDropdown from "./../../containers/Dropdowns/SortDropdown"
import FilterDropdown from "./../../containers/Dropdowns/FilterDropdown"

function Explore({ account }) {
  const [sort, setSort] = useState('Newest')

  const [filter, setFilter] = useState([])

  const sortByTime = ['Newest', 'Oldest']
  const sortByRequests = ['Most requests', 'Least requests'];
  const sortByPrice = ['Lowest price', 'Highest price'];

  const filterByTime = ["Today", "This week", "This month", "This year"]
  const filterByRequests = ["No one", "1 - 2", "2 - 5", "More than 5"]
  const filterByPrice = ["On sale", "Not on sale", "Lower than 1", "1 - 10", "10 - 25", "Higher than 25"]

  const nft = "QmU7yX6TuwLbtm5rumB5oxBc6d4NGNdFgL6cEnwjVBBNJQ"

  return (
    <div className='page-bg'>
      <div className='flex justify-self-center justify-between w-11/12 h-20 z-10'>
        <div className='flex justify-between w-auto'>
          <div className='w-40 h-full mx-3'>
            <SortDropdown name="Time" array={sortByTime} sort={sort} setSort={setSort} />
          </div>
          <div className='w-40 h-full mx-3'>
            <SortDropdown name="Volume" array={sortByRequests} sort={sort} setSort={setSort} />
          </div>
          <div className='w-40 h-full mx-3'>
            <SortDropdown name="Price" array={sortByPrice} sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className='flex justify-between w-auto'>
          <div className='w-40 h-full mx-3'>
            <FilterDropdown name="Time" array={filterByTime} filter={filter} setFilter={setFilter} />
          </div>
          <div className='w-40 h-full mx-3'>
            <FilterDropdown name="Volume" array={filterByRequests} filter={filter} setFilter={setFilter} />
          </div>
          <div className='w-40 h-full mx-3'>
            <FilterDropdown name="Price" array={filterByPrice} filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>

      <div className="content-board-view mt-20">
        {
          [...Array(10)].map((_, i) => {
            return (
              <SmallNFT account={account} nft={nft} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Explore
