import { useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";

import CollectionCard from './../../../../../Collection/CollectionCard'
import CreateCollection from '../../../../../Collection/CreateCollection'

import { getUserCustomCollections } from '../../../../../../utils/ReadonlyContracts'


function Collection({ address, active, setOpen, setCollection, setCollectionInfo, setNFTs, setBigCollection }) {
    const [createCollection, setCreateCollection] = useState(false)

    const [customCollections, setCustomCollection] = useState([])


    useEffect(() => {
        const collectionsAwait = async () => {
            await getUserCustomCollections(address).then((res) => {
                setCustomCollection(res)
            })
        }

        collectionsAwait();
    }, [setOpen, setCollection, setBigCollection])


    return (
        <>
            {createCollection && <CreateCollection address={address} setCreateCollection={setCreateCollection} />}

            <div className={`${active ? "h-[85vh]" : "h-0"} w-[27rem] fixed right-8 mt-14
            transform duration-300 ease-in-out select-none
            rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-md`} >
                <div className={active ? "h-full" : "hidden"}>

                    <div className='w-4/5 py-5 border-b-[1px] border-slate-300 dark:border-slate-700 mx-auto'>
                        <p className='ml-5 font-bold text-2xl text-slate-900 dark:text-slate-100'>Your collection</p>
                    </div>
                    <div className='flex-initial gap-2 w-full h-max  pb-10 main-overflow'>

                        <div className='grid place-content-center w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global' onClick={() => { setOpen(''); setCreateCollection(true) }}>
                            <p className="text-high h-full w-full">
                                Create new collection
                            </p>
                        </div>
                        {
                            customCollections ? customCollections.map((collection) => {
                                return (
                                    <div className='w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global'>
                                        <CollectionCard setOpen={setOpen} collection={collection} setCollection={setCollection} setNFTs={setNFTs} setCollectionInfo={setCollectionInfo} setBigCollection={setBigCollection} />
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