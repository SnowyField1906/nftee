import IconService from 'icon-sdk-js';

import { iconService } from './../../provider/IconService'

import videoBackground from './../../assets/videos/videoBackground.mp4';
import Arrow from './components/Arrow';

function Welcome() {

  const createWallet = async function () {
    const wallet = IconService.IconWallet.create(); //Wallet Creation
    const address = wallet.getAddress(); // Get Address
    const privateKey = wallet.getPrivateKey(); // Get Private Key

    console.log(address, privateKey);
  }


  const getBalance = async function () {
    const balance = await iconService.getBalance('hxf9bfff62e92b621dfd823439c822d73c7df8e698').execute();
    console.log(balance);
  }

  getBalance();



  const eventHandler = (e) => {
    const { type, payload } = e.detail;
    if (type === 'RESPONSE_HAS_ACCOUNT') {
      console.log(payload.hasAccount); // true or false
    }
  }
  window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);



  return (
    // <div className='h-screen bg-cover bg-center overflow-hidden bg-wlc-dark'>
    //   Welcome
    // </div>
    <div className='grid h-screen w-screen verflow-hidden'>
      <div className='fixed flex justify-between self-center justify-self-center w-[60%] h-5/6 backdrop-blur-xl bg-white/50 dark:bg-black/50 border-1 rounded-2xl translate-y-10'>
        <div className='w-[60%] h-5/6 grid self-center ml-20 justify-center items-center'>
          <p className='font-semibold text-4xl text-black dark:text-white'>Welcome to NFTee</p>
          <p className='mt-10 font-light text-black dark:text-white'>You are about to enter the busiest and the most massive art museum on the planet.</p>
          <p className='mt-10 font-light text-black dark:text-white'>Embrace the moment when the era of traditional digital transformation gives way to blockchain's.</p>
          <p className='text-center mt-20 font-semibold text-2xl text-black dark:text-white'>The greatest awaits you.</p>
          <Arrow />
          <button className='w-52 h-14 mb-3 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'>
            <div className="w-full h-full bg-gradient-to-br from-[#cc3eff] via-[#11d3ff] to-[#22ff98] group-hover:from-[#00ff91] group-hover:via-[#00b3ff] group-hover:to-[#b742ff] absolute"></div>
            <div className="w-full h-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-full group-hover:bg-opacity-0 duration-400">
              <div className="w-full h-full relative text-white ">Connect wallet</div>
            </div>
          </button>
          <button className='w-52 h-14 item place-self-center relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full transition duration-300 ease-in-out hover:bg-green-400 transform hover:-translate-y-1'
            onClick={createWallet}>
            <div className="w-full h-full bg-gradient-to-br from-[#c23eff] via-[#8411ff] to-[#ff2298] group-hover:from-[#ff00b7] group-hover:via-[#8000ff] group-hover:to-[#dc42ff] absolute"></div>
            <div className="w-full h-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-full group-hover:bg-opacity-0 duration-400">
              <div className="w-full h-full relative text-white">Create wallet</div>
            </div>
          </button>
        </div>

        <div className='flex w-full h-full self-center bg-welcome-picture-1 bg-contain bg-no-repeat rounded-r-2xl'>
        </div>

      </div>

      <video autoPlay loop muted className="fixed bg-center overflow-hidden -z-10" src={videoBackground} />

    </div>
  )
}

export default Welcome
