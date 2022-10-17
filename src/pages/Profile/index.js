import { useState } from 'react';
import IconService from 'icon-sdk-js';

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')

export const iconService = new IconService(httpProvider);
function Profile({ account }) {
  const [balance, setBalance] = useState('')

  const getBalance = async () => {
    const balance = await iconService.getBalance(account.address).execute();
    const balanceValue = (IconService.IconAmount.of(balance, IconService.IconAmount.Unit.ICX) / 10e17).toString();
    setBalance(balanceValue)
  }

  getBalance()

  return (
    <div className='page-bg h-screen'>
      <div className="grid justify-between px-10 pt-32 w-2/5">
        <p className="text-black dark:text-white font-semibold text-xl">{account.address}</p>
        <p className="text-black dark:text-white font-semibold text-xl">{balance}</p>
      </div>
    </div>
  )
}

export default Profile
