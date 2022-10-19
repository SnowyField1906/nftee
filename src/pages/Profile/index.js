import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import IconService from 'icon-sdk-js';
import { getUserCollections } from '../../utils/ReadonlyContracts';
import SmallCollection from '../../containers/Collection/SmallCollection';


const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')
const iconService = new IconService(httpProvider);


function Profile({ account }) {
  const [balance, setBalance] = useState('')
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const getBalance = async () => {
      const balance = await iconService.getBalance(account.address).execute();
      const balanceValue = (IconService.IconAmount.of(balance, IconService.IconAmount.Unit.ICX) / 10e17).toString();
      setBalance(balanceValue)
    }
    getBalance();

    const collectionsAwait = async () => {
      await getUserCollections(account.address).then((res) => {
        setCollections(res)
      })
    }
    collectionsAwait();
  }, [])


  if (account.login === false) {
    return (
      <Navigate to="/NFTee" />
    )
  }

  return (
    <div className='page-bg h-screen place-items-center'>
      <div className="grid justify-between px-10 pt-32 w-2/5">
        <p className="text-black dark:text-white font-semibold text-xl">{account.address}</p>
        <p className="text-black dark:text-white font-semibold text-xl">{balance}</p>
      </div>

      <div className="grid justify-between px-10 pt-32 w-full place-items-center">
        {!collections ?
          <p className="text-black dark:text-white font-semibold text-xl">No collections</p>
          :
          <div className="w-full justify-items-center place-items-center">
            <p className="text-black dark:text-white font-semibold text-xl">Your owning Collections</p>
            <div className="flex flex-wrap w-full justify-evenly">
              {
                collections.map((collection) => {
                  return (
                    <SmallCollection collection={collection} />
                  )
                })
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Profile
