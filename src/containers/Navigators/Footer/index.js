import Arrow from "./components/Arrow"
import Facebook from "./components/Facebook"
import Twitter from "./components/Twitter"
import Github from "./components/Github"
import Linkedin from "./components/Linkedin"
import Wakatime from "./components/Wakatime"


function Footer() {
  return (
    <div className='flex h-52 bg-white/40 dark:bg-black/40 mt-20 border-t-2 border-black/30 dark:border-white/30'>
      <div className="relative grid place-content-center place-items-center h-full w-[20%]">
        <div className=' bg-DEVERA w-80 h-[90px] bg-no-repeat bg-center'>
        </div>
        <div className=' bg-ICON w-[16.5rem] h-[90px] bg-no-repeat bg-center'>
        </div>
      </div>
      <div className="flex w-[65%] h-full place-items-center justify-items-center justify-around">
        <div className="grid">
          <p className="text-huge font-light mb-5">Keep in touch with @SnowyField1906</p>
          <div className="grid place-content-center w-full py-3">
            <Arrow />
          </div>
          <div className="flex justify-around w-full h-[40px] ">
            <a className="cursor-pointer flex place-items-center justify-items-center hover:fill-gray-500"
              href="https://github.com/SnowyField1906" target="_blank">
              <Github />
              <p className="text-huge text-lg font-light ml-5 mr-10">SnowyField1906</p>
            </a>
            <a className="cursor-pointer flex place-items-center justify-items-center hover:fill-gray-500"
              href="https://linkedin.com/in/NHThuan" target="_blank">
              <Linkedin />
              <p className="text-huge text-lg font-light ml-5 mr-10">NHThuan</p>
            </a>
            <a className="cursor-pointer flex place-items-center justify-items-center hover:fill-gray-500"
              href="https://wakatime.com/SnowyField1906" target="_blank">
              <Wakatime />
              <p className="text-huge text-lg font-light ml-5 mr-10">SnowyField1906</p>
            </a>
            <a className="cursor-pointer flex place-items-center justify-items-center hover:fill-gray-500"
              href="https://facebook.com/trantieuvann" target="_blank">
              <Facebook />
              <p className="text-huge text-lg font-light ml-5 mr-10">trantieuvann</p>
            </a>
            <a className="cursor-pointer flex place-items-center justify-items-center hover:fill-gray-500"
              href="https://twitter.com/27Euterpe" target="_blank">
              <Twitter />
              <p className="text-huge text-lg font-light ml-5 mr-10">27Euterpe</p>
            </a>
          </div>
        </div>
      </div>
      <div className="relative grid place-content-center place-items-center h-full w-[20%]">
        <div className="grid right-0">
          <p className="text-medium text-right text-2xl font-light my-2">Other information</p>
          <p className="text-medium text-right font-light my-2">Nguyen Huu Thuan</p>
          <p className="text-medium text-right font-light my-2">nguyenhuuthuan25112003@gmail.com</p>
          <p className="text-medium text-right font-light my-2">(+84) 92 607 9271</p>
        </div>
      </div>
    </div >
  )
}

export default Footer
