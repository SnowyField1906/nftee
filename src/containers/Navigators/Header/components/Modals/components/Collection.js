import { useState, useEffect } from 'react'
import CollectionCard from './CollectionCard'
import CreateCollection from '../../../../../Collection/CreateCollection'

import { getUserCollections } from '../../../../../../utils/ReadonlyContracts'
import SmallCollection from '../../../../../Collection/SmallCollection'


function Collection({ active, account }) {
    const [modal, setModal] = useState(false)

    const [collections, setCollections] = useState([])

    useEffect(() => {
        const collectionsAwait = async () => {
            const result = await getUserCollections(account.address).then((res) => {
                setCollections(res)
            })
        }
        collectionsAwait();
    }, [])


    return (
        <>
            {modal && <CreateCollection setModal={setModal} account={account} />}

            <div className={`${active ? "h-[50rem]" : "h-0"} w-[20%] fixed right-5 mt-14
            transform duration-300 ease-in-out select-none
            rounded-2xl bg-white/50 dark:bg-black/50 backdrop-blur-md`} >

                <div className={active ? "h-full" : "hidden"}>
                    <div className='w-4/5 py-5 border-b-[1px] border-slate-300 dark:border-slate-700 mx-auto'>
                        <p className='ml-5 font-bold text-2xl text-slate-900 dark:text-slate-100'>Your collection</p>
                    </div>
                    <div className='flex-initial gap-2 w-full h-full'>
                        {
                            collections ? collections.map((collection) => {
                                return (
                                    <div className='w-[90%] h-[10%] mx-[5%] mt-3 rounded-xl transform ease-in-out duration-100
        border-2 border-slate-700 dark:border-slate-300 hover:border-none
        bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r
        hover:from-blue-400 dark:hover:from-blue-700
        hover:to-violet-400 dark:hover:to-violet-700'>
                                        <CollectionCard collection={collection} />
                                    </div>
                                )
                            })
                                : null
                        }
                        <div className='w-[90%] h-[10%] mx-[5%] mt-3 rounded-xl transform ease-in-out duration-100
        border-2 border-slate-700 dark:border-slate-300 hover:border-none
       hover:bg-gradient-to-r
        hover:from-blue-400 dark:hover:from-blue-700
        hover:to-violet-400 dark:hover:to-violet-700' onClick={() => setModal(true)}>
                            <p className="text-high text-center">
                                create new collection
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Collection