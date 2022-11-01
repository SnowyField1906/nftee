import { useState, useEffect } from 'react';

import { getPublicNotifications } from '../../utils/ReadonlyContracts';

import NotificationCard from '../../containers/NFT/NotificationCard';
import BigNFT from '../../containers/NFT/BigNFT';

function Logs({ account }) {
  const address = account.wallet ? account.wallet.getAddress() : account.address;
  const [open, setOpen] = useState(false);
  const [bigNFT, setBigNFT] = useState(false)

  const [nft, setNFT] = useState('');

  const [nftInfo, setNFTInfo] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [page, setPage] = useState(0);

  const notificationAwaits = async () => {
    await getPublicNotifications().then((res) => {
      setNotifications(res)
    })
  }

  useEffect(() => {
    notificationAwaits();
  }, [])

  return (
    <>
      {bigNFT &&
        <div className="fixed w-screen h-screen z-30">
          <BigNFT address={account.address} nft={nft} nftInfo={nftInfo} setBigNFT={setBigNFT} />
        </div>}
      <div className='page-bg h-screen  main-overflow select-none'>
        <div className='w-screen h-full fixed -z-10 bg-home-picture-1 bg-center bg-no-repeat bg-cover overflow-x-hidden'>
        </div>
        <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30 overflow-x-hidden'>

        </div>
        <div className="content-board-view pt-32">
          {
            notifications.slice(20 * page, 20 * page + 20).map((notification) => {
              return (
                <div className='w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global'>
                  <NotificationCard address={address} notification={notification} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} setOpen={setOpen} />
                </div>
              )
            })
          }
        </div>
        <div className='flex absolute bottom-3 z-20 bg-white/20 dark:bg-black/20 py-3 px-5 rounded-xl backdrop-lg'>
          <button className={`${page === 0 ? 'button-medium-disabled cursor-not-allowed' : 'button-medium cursor-pointer'} w-32 text-center text-medium text-lg h-fit py-2 px-5 rounded-md`} disabled={page <= 0}
            onClick={() => setPage(page - 1)}>Previous</button>
          <div className='text-medium text-lg h-fit py-2 px-5 rounded-md'>Page {page + 1} ({20 * page + 20 < notifications.length ? 20 * page + 20 : notifications.length}/{notifications.length})</div>
          <button className={`${20 * page + 20 > notifications.length ? 'button-medium-disabled cursor-not-allowed' : 'button-medium cursor-pointer'} w-32 text-center text-medium text-lg h-fit py-2 px-5 rounded-md`} disabled={20 * page + 20 > notifications.length}
            onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </>

  )
}

export default Logs
