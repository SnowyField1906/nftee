import { useState, useEffect, useRef } from 'react';

import { getPublicNotifications, getNotificationInfo } from '../../utils/ReadonlyContracts';

import NotificationCard from '../../containers/NFT/NotificationCard';

function Wallet({ account }) {
  const address = account.wallet ? account.wallet.getAddress() : account.address;

  const [editNFT, setEditNFT] = useState(false)

  const [bigNFT, setBigNFT] = useState(false)

  const [nft, setNFT] = useState('');

  const [nftInfo, setNFTInfo] = useState([]);
  const [notifications, setNotifications] = useState([]);




  const notificationAwaits = async () => {
    await getPublicNotifications(address).then((res) => {

      setNotifications(res)
    })
  }

  useEffect(() => {
    notificationAwaits();
  }, [])


  return (
    <>
      <div className='page-bg h-screen  main-overflow select-none'>
        <div className='w-screen h-full fixed -z-10 bg-home-picture-1 bg-center bg-no-repeat bg-cover overflow-x-hidden'>
        </div>
        <div className='w-screen h-screen fixed -z-10 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30 overflow-x-hidden'>

        </div>
        <div className="content-board-view pt-36">
          {
            notifications.map((notification) => {
              return (
                <div className='w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global'>
                  <NotificationCard address={address} notification={notification} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} />
                </div>
              )
            })
          }
        </div>
      </div>
    </>

  )
}

export default Wallet
