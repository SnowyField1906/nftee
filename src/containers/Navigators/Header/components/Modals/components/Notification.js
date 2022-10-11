import React from 'react'
import NotificationCard from './NotificationCard'

function Notification({ active }) {
    return (
        <div className={`${active ? "h-[50rem]" : "h-0"} w-[20%] fixed right-5 mt-14 
            transform duration-300 ease-in-out select-none
            rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md`} >
            <div className={active ? "h-full" : "hidden"}>
                <div className='w-4/5 py-5 border-b-[1px] border-slate-300 dark:border-slate-700 mx-auto'>
                    <p className='ml-5 font-bold text-3xl text-slate-900 dark:text-slate-100'>Your notification</p>
                </div>
                <div className='flex-initial gap-2 w-full h-full'>
                    {
                        [...Array(5)].map((_, i) => {
                            return (
                                <div className='w-[90%] h-[10%] mx-[5%] mt-3 rounded-xl transform ease-in-out duration-100
        border-2 border-slate-700 dark:border-slate-300 hover:border-none
        bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r
        hover:from-blue-400 dark:hover:from-blue-700
        hover:to-violet-400 dark:hover:to-violet-700'>
                                    <NotificationCard name="Product Name" price="100" />
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Notification
