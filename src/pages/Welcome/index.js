import { useState } from 'react';
import IconService from 'icon-sdk-js';

import { iconService, accountHandler, addressHandler } from './../../provider/IconService'

import videoBackground from './../../assets/videos/videoBackground.mp4';
import Arrow from './components/Arrow';
import CreateWallet from './components/CreateWallet';
import LoadWallet from './components/LoadWallet';

function Welcome() {
  const [account, setAccount] = useState({
    address: '',
    privateKey: '',
  });


  const [tag, setTag] = useState(null);

  const createWallet = () => {
    const wallet = IconService.IconWallet.create();
    setTag(<CreateWallet wallet={wallet} setTag={setTag} />);
  }

  console.log(tag)

  const modalTag = (modal) => {
    const Tag = modal;
    console.log(Tag)
    return <Tag setModal={setTag} />
  };




  const storeWallet = () => {
    if (!account.privateKey) {
      return;
    }
    const wallet = IconService.IconWallet.loadPrivateKey(account.privateKey);
    console.log(wallet.store('qwer1234!'));
    localStorage.setItem('privateKey', wallet.store('qwer1234!'));
  }


  const loadWalletByPrivateKey = (privateKey) => {
    const walletLoadedByPrivateKey = IconService.IconWallet.loadPrivateKey(privateKey);
    return {
      address: walletLoadedByPrivateKey.getAddress(),
      privateKey: walletLoadedByPrivateKey.getPrivateKey()
    }
  }

  const loadWalletByFile = (keystoreFile) => {
    const walletLoadedByKeyStore = IconService.IconWallet.loadKeystore(keystoreFile, 'qwer1234!');
    return {
      address: walletLoadedByKeyStore.getAddress(),
      privateKey: walletLoadedByKeyStore.getPrivateKey()
    }
  }

  const connectWallet = () => {
    const privateKey = localStorage.getItem('privateKey');
    if (!privateKey) {
      return;
    }
    const wallet = IconService.IconWallet.loadPrivateKey(privateKey);
    accountHandler.setAccount(wallet);
    addressHandler.setAddress(wallet.getAddress());
  }

  return (
    <div className='grid h-screen w-screen overflow-hidden'>
      <div className='fixed grid justify-between self-center justify-self-center w-[60%] h-5/6 backdrop-blur-xl bg-white/50 dark:bg-black/50 border-1 rounded-2xl translate-y-10'>
        <div className={`${tag ? 'w-0 h-0' : 'w-full h-full'} fixed flex justify-between self-center justify-self-center transform duration-300 ease-in-out`}>

          {tag ? null :
            <div className='w-[60%] h-11/12 grid self-center ml-20 justify-center items-center'>
              <p className='font-semibold text-4xl text-black dark:text-white'>Welcome to NFTee</p>
              <p className='mt-7 font-light text-black dark:text-white'>You are about to enter the busiest and the most massive art museum on the planet.</p>
              <p className='mt-7 font-light text-black dark:text-white'>Embrace the moment when the era of traditional digital transformation gives way to blockchain's.</p>
              <p className='text-center mt-10 font-semibold text-2xl text-black dark:text-white'>The greatest awaits you.</p>
              <Arrow />


              <button className='w-[22rem] h-14 mb-3 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'
                onClick={createWallet}>
                <div className="w-full h-full bg-gradient-to-br from-[#cc3eff] via-[#11d3ff] to-[#22ff98] group-hover:from-[#00ff91] group-hover:via-[#00b3ff] group-hover:to-[#b742ff] absolute"></div>
                <div className="w-full h-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-full group-hover:bg-opacity-0 duration-400">
                  <div className="w-full h-full relative text-white">Create wallet</div>
                </div>
              </button>

              <div className='flex w-[22rem] place-self-center justify-between'>
                <button className='w-[10.5rem] h-14 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'
                  onClick={connectWallet}>
                  <div className="w-full h-full bg-gradient-to-br from-[#c23eff] via-[#8411ff] to-[#ff2298] group-hover:from-[#ff00b7] group-hover:via-[#8000ff] group-hover:to-[#dc42ff] absolute"></div>
                  <div className="w-full h-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-full group-hover:bg-opacity-0 duration-400">
                    <div className="w-full h-full relative text-white ">Connect wallet</div>
                  </div>
                </button>
                <button className='w-[10.5rem] h-14 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'
                  onClick={() => setTag()}>
                  <div className="w-full h-full bg-gradient-to-br from-[#c23eff] via-[#8411ff] to-[#ff2298] group-hover:from-[#ff00b7] group-hover:via-[#8000ff] group-hover:to-[#dc42ff] absolute"></div>
                  <div className="w-full h-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-full group-hover:bg-opacity-0 duration-400">
                    <div className="w-full h-full relative text-white ">Load wallet</div>
                  </div>
                </button>
              </div>
            </div>
          }

          <div className='flex w-full h-full self-center bg-welcome-picture-1 bg-contain bg-no-repeat rounded-r-2xl'>
          </div>
        </div>

        <div className='w-screen'>
          {tag}
        </div>

      </div>



      <div className='fixed bg-center overflow-hidden w-auto h-fit bg-contain video-container -z-10 '>
        <video autoPlay loop muted className="video" src={videoBackground} />
      </div>


    </div>
  )
}

export default Welcome
