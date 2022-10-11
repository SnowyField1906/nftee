import videoBackground from './../../assets/videos/videoBackground.mp4';

function Welcome() {
  return (
    // <div className='h-screen bg-cover bg-center overflow-hidden bg-wlc-dark'>
    //   Welcome
    // </div>
    <div className='grid light-bg h-screen w-screen dark:dark-bg overflow-hidden'>
      <div className='fixed flex justify-between self-center justify-self-center w-[60%] h-5/6 backdrop-blur-xl bg-white/30 dark:bg-black/30 border-1 rounded-2xl translate-y-10'>
        <div className='w-[60%] h-5/6 self-center ml-20 justify-center items-center'>
          <p className='font-semibold text-4xl text-black dark:text-white'>Welcome to NFTee</p>
          <p className='mt-10 font-light text-black dark:text-white'>This website built on ICX.</p>
          <p className='mt-10 font-light text-black dark:text-white'>You are about to enter the busiest and the most massive art museum on the planet.</p>
          <p className='mt-10 font-light text-black dark:text-white'>Embrace the moment when the era of traditional digital transformation gives way to blockchain's.</p>
          <p className='mt-20 font-semibold text-2xl text-black dark:text-white'>The greatest awaits you.</p>

        </div>
        <div className='flex w-full h-full self-center bg-welcome-picture-1 bg-contain bg-no-repeat rounded-r-2xl'>
        </div>
      </div>
      <video autoPlay loop muted className="h-auto w-screen bg-screen bg-cover bg-center overflow-hidden" src={videoBackground} />
    </div>
  )
}

export default Welcome
