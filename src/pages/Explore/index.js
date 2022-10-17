import SmallNFT from "../../containers/NFT/SmallNFT"

function Explore() {
  return (
    <div className='page-bg'>
      <div className="flex px-10 w-2/5 justify-between">
        <button className="text-black dark:text-white font-semibold text-xl border-2 rounded-md px-5 py-2">All</button>

      </div>
      <div className="content-list-view">
        {
          [...Array(20)].map((_, i) => {
            return (
              <SmallNFT />
            )
          })
        }
      </div>
    </div>
  )
}

export default Explore
