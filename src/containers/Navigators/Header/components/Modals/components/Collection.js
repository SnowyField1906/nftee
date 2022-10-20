import { useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";


import CollectionCard from './../../../../../Collection/CollectionCard'
import CreateCollection from '../../../../../Collection/CreateCollection'

import { getUserCollections } from '../../../../../../utils/ReadonlyContracts'


function Collection({ active, account }) {
    const [modal, setModal] = useState(false)

    const [collections, setCollections] = useState([])

    useEffect(() => {
        const collectionsAwait = async () => {
            await getUserCollections(account.address).then((res) => {
                setCollections(res)
            })
        }
        collectionsAwait();
    }, [active])

    const customCollections = collections.filter((collection) => (collection !== account.address + '/owning' && collection !== account.address + '/cart'))



    return (
        <>
            {modal && <CreateCollection setModal={setModal} account={account} />}

            <div className={`${active ? "h-screen" : "h-0"} w-[27rem] fixed right-8 mt-14
            transform duration-300 ease-in-out select-none
            rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-md`} >
                <div className={active ? "h-full" : "hidden"}>

                    <div className='w-4/5 py-5 border-b-[1px] border-slate-300 dark:border-slate-700 mx-auto'>
                        <p className='ml-5 font-bold text-2xl text-slate-900 dark:text-slate-100'>Your collection</p>
                    </div>
                    <div className='flex-initial gap-2 w-full h-full'>

                        <div className='grid place-content-center w-[25rem] h-[7rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global' onClick={() => setModal(true)}>
                            <p className="text-high h-full w-full">
                                create new collection
                            </p>
                        </div>
                        {
                            customCollections ? customCollections.map((collection) => {
                                return (
                                    <div className='w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global'>
                                        <CollectionCard collection={collection} />
                                    </div>
                                )
                            })
                                : null
                        }

                    </div>

                </div>
            </div>


        </>

    )
}

export default Collection