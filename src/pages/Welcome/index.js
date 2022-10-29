import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import IconService from 'icon-sdk-js';

import videoBackground from './../../assets/videos/videoBackground.mp4';
import Arrow from './components/Arrow';
import CreateWallet from './components/CreateWallet';
import LoadWallet from './components/LoadWallet';

function Welcome({ account, setAccount }) {

  const [tag, setTag] = useState(null);

  const createWallet = () => {
    const wallet = IconService.IconWallet.create();
    setTag(<CreateWallet wallet={wallet} setTag={setTag} account={account} setAccount={setAccount} />);
  }

  const loadWallet = () => {
    setTag(<LoadWallet setTag={setTag} account={account} setAccount={setAccount} />);
  }

  const connectWallet = () => {
    const requestAddress = new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: {
        type: 'REQUEST_ADDRESS'
      }
    });
    window.dispatchEvent(requestAddress);

    const responseAccount = (e) => {
      const { type, payload } = e.detail;
      if (type === 'RESPONSE_ADDRESS') {
        setAccount({
          ...account,
          address: payload
        })
      }
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', responseAccount);
  }

  if (account.address) {
    return <Navigate to="/NFTee/h/" />
  }

  return (
    <div className='grid h-screen w-screen overflow-hidden select-none'>
      <div className='fixed grid justify-between self-center justify-self-center w-[60%] h-5/6 backdrop-blur-xl bg-white/50 dark:bg-black/50 border-1 rounded-2xl translate-y-10 z-10'>
        <div className={`${tag ? 'w-0 h-0' : 'w-full h-full'} fixed flex justify-between self-center justify-self-center transform duration-300 ease-in-out`}>

          {tag ? null :
            <div className='w-[60%] h-11/12 grid self-center ml-20 justify-center items-center'>
              <p className='font-semibold text-4xl text-black dark:text-white'>Welcome to NFTee</p>
              <p className='mt-7 font-light text-black dark:text-white'>You are about to enter the busiest and the most massive art museum on the planet.</p>
              <p className='mt-7 font-light text-black dark:text-white'>Embrace the moment of transformation when the era of traditional digital gives way to blockchain's.</p>
              <p className='text-center mt-10 font-semibold text-2xl text-black dark:text-white'>The greatest awaits you.</p>
              <Arrow />


              <button className='w-[22rem] h-14 mb-3 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'
                onClick={createWallet}>
                <div className="w-full h-full bg-gradient-to-br from-[#cc3eff] via-[#11d3ff] to-[#22ff98] group-hover:from-[#00ff91] group-hover:via-[#00b3ff] group-hover:to-[#b742ff] absolute"></div>
                <div className="w-full h-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-full group-hover:bg-opacity-0 duration-400">
                  <div className="w-full h-full relative text-white">Create wallet</div>
                </div>
              </button>

              <p className='text-center mt-4 mb-2 text-md text-black dark:text-white'>Have ICX wallets already?</p>

              <div className='flex w-[22rem] place-self-center justify-between'>
                <button className='w-[10.5rem] h-14 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'
                  onClick={connectWallet}>
                  <div className="w-full h-full bg-gradient-to-br from-[#c23eff] via-[#8411ff] to-[#ff2298] group-hover:from-[#ff00b7] group-hover:via-[#8000ff] group-hover:to-[#dc42ff] absolute"></div>
                  <div className="w-full h-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-full group-hover:bg-opacity-0 duration-400">
                    <div className="w-full h-full relative text-white ">Connect wallet</div>
                  </div>
                </button>
                <button className='w-[10.5rem] h-14 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'
                  onClick={loadWallet}>
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



      <div className='fixed bg-center overflow-hidden w-auto h-fit bg-contain video-container -z-0 '>
        <video autoPlay loop muted className="video" src={videoBackground} />
      </div>


    </div>
  )
}

export default Welcome
