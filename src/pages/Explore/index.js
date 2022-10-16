import MiniNFT from "../../containers/NFT/MiniNFT"

function Explore({ account, setAccount }) {
  return (
    <div className='grid h-max w-screen overflow-x-hidden bg-slate-300 dark:bg-slate-600'>
      <div className="flex px-10 pt-32 w-2/5 justify-between">
        <button className="text-black dark:text-white font-semibold text-xl border-2 rounded-md px-5 py-2">All</button>
        <div class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">

        </div>




      </div>
      <div className="w-11/12 grid grid-cols-5 h-max justify-self-center place-items-center">
        {
          [...Array(36)].map((_, i) => {
            return (
              <MiniNFT />
            )
          })
        }
      </div>
    </div>
  )
}

export default Explore
