import { computeHeadingLevel } from '@testing-library/react'
import { useState, useEffect } from 'react'

import { getUserNotifications, getNotificationInfo } from '../../../../../../utils/ReadonlyContracts'

import NotificationCard from '../../../../../NFT/NotificationCard'

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/scrollbar";
// import { FreeMode, Scrollbar, Mousewheel } from "swiper";


function Notification({ address, active, setOpen, setNFT, setNFTInfo, setBigNFT }) {
    const [notifications, setNotifications] = useState([])


    const notificationAwaits = async () => {
        await getUserNotifications(address).then((res) => {

            setNotifications(res)
        })
    }

    console.log(notifications)

    useEffect(() => {
        notificationAwaits();
    }, [active, setOpen])

    return (
        <div className={`${active ? "h-[85vh]" : "h-0"} w-[27rem] fixed right-8 mt-14
        transform duration-300 ease-in-out select-none
        rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-md main-overflow`} >
            <div className={active ? "h-full" : "hidden"}>

                <div className='flex justify-between w-4/5 py-5 border-b-[1px] border-slate-300 dark:border-slate-700 mx-auto place-items-center'>
                    <p className='ml-5 font-bold text-2xl text-slate-900 dark:text-slate-100'>Your Notification</p>
                </div>
                <div className='overflow-hidden relative gap-2 w-full h-[200vh] main-overflow'>
                    {/* <Swiper
                        direction={"vertical"}
                        slidesPerView={"auto"}
                        freeMode={true}
                        scrollbar={true}
                        mousewheel={true}
                        modules={[FreeMode, Scrollbar, Mousewheel]}
                    >
                        <SwiperSlide> */}
                    {
                        notifications.map((notification) => {
                            return (
                                <div className='w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global'>
                                    <NotificationCard address={address} notification={notification} setOpen={setOpen} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} />
                                </div>
                            )
                        })
                    }
                    {/* </SwiperSlide>
                    </Swiper> */}

                </div>

            </div>
        </div>
    )
}

export default Notification
