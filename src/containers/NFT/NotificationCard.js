import { useState, useEffect } from "react";
import { findPublicGateWay } from "../../utils/constants";
import { dateConventer } from "../../utils/helpers";
import { getNFTInfo, getNotificationInfo } from "../../utils/ReadonlyContracts";


function NotificationCard({ address, notification, setOpen, setNFT, setNFTInfo, setBigNFT }) {
    const [temporaryNFTInfo, setTemporaryNFTInfo] = useState([])
    const [notificationInfo, setNotificationInfo] = useState([])

    const nftInfoAwait = async () => {
        await getNFTInfo(notification.slice(16)).then((res) => {
            setTemporaryNFTInfo(res)
        })
    }
    const notificationInfoAwait = async () => {
        await getNotificationInfo(notification).then((res) => {
            setNotificationInfo(res)
        })
    }
    useEffect(() => {
        nftInfoAwait();
        notificationInfoAwait();
    }, [notification, setOpen, setNFTInfo, setNFT, setBigNFT])

    const openBigNFT = () => {
        setOpen('')
        setNFTInfo(temporaryNFTInfo)
        setNFT(notification.slice(16))
        setBigNFT(true)
    }


    if (!notificationInfo || notificationInfo.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500">
                </div>
            </div>
        )
    }

    else {
        return (

            <div className="w-[25rem] h-[8rem] select-none bg- bg-cover bg-center"
                onClick={openBigNFT}>
                <div className="grid absolute w-[25rem] h-[8rem]">
                    <div className="mt-2 w-[24rem] h-[5rem] justify-self-center flex justify-between bg- bg-center bg-cover rounded-md"
                        style={{
                            backgroundImage: `url(${findPublicGateWay(notification.slice(16))})`,
                        }}>
                    </div>
                    <div className='flex justify-between absolute bg-white/50 dark:bg-black/50 mt-2 w-[24rem] h-[5rem] justify-self-center'>
                        <div className='flex flex-col justify-center'>
                            <p className="ml-4 text-sm text-black dark:text-white">{notificationInfo[1]}</p>
                        </div>
                    </div>


                    <div className='flex justify-between absolute bottom-0 w-[25rem] h-[2.5rem] place-items-center place-content-center'>
                        <p className="ml-4 font-bold shadow-xl text-lg text-black dark:text-white">{notificationInfo[0]}</p>
                        <p className="mr-4 font-bold shadow-xl text-lg text-black dark:text-white">{dateConventer(notification.slice(0, 16))}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotificationCard
