import { useState, useEffect } from 'react'


import CollectionCard from './CollectionCard'
import CreateCollection from './CreateCollection'

import { getUserCustomCollections } from './../../utils/ReadonlyContracts'
import { addNFT } from './../../utils/TransactionContracts'
import BigCollection from './BigCollection'


function CollectionList({ address, setCollectionList, nft }) {
    const [createCollection, setCreateCollection] = useState(false)
    const [bigCollection, setBigCollection] = useState(false)

    const [collections, setCollections] = useState([])

    useEffect(() => {
        const collectionsAwait = async () => {
            await getUserCustomCollections(address).then((res) => {
                setCollections(res)
            })
        }
        collectionsAwait();
    }, [])



    return (
        <>
            {createCollection && <CreateCollection address={address} setCreateCollection={setCreateCollection} />}
            {bigCollection && <BigCollection address={address} setBigCollection={setBigCollection} />}

            <div className='fixed mt-20 w-[60%] h-[70%] top-[10%] left-[20%] rounded-2xl z-30 backdrop-lg'>
                <svg className="absolute top-0 right-0 m-4 h-8 w-8 fill-black dark:fill-white cursor-pointer z-50" onClick={() => setCollectionList(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>

                <div className="absolute top-0 right-0 w-full h-full content-board-view justify-evenly">
                    <div className='grid place-content-center w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global' onClick={() => setCreateCollection(true)}>
                        <p className="text-high h-full w-full">
                            Create new collection
                        </p>
                    </div>
                    {
                        collections ? collections.map((collection) => {
                            return (
                                <div className='w-[25rem] h-[8rem] mx-[1rem] mt-3 rounded-xl transform ease-in-out duration-100 button-global'
                                    onClick={() => addNFT(nft, collection)}>
                                    <CollectionCard collection={collection} />
                                </div>
                            )
                        })
                            : null
                    }
                </div>
            </div>

        </>

    )
}

export default CollectionList