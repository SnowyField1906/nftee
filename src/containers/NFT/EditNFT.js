import { useState, useEffect } from 'react'

import { editNFTInfo } from './../../utils/TransactionContracts'


function EditNFT({ address, setEditNFT, nft }) {
    const [createCollection, setCreateCollection] = useState(false)
    const [bigCollection, setBigCollection] = useState(false)

    const [collections, setCollections] = useState([])


    return (
        <>
            <div className='fixed mt-20 w-[60%] h-[70%] top-[10%] left-[20%] rounded-2xl z-30 backdrop-lg'>
                <svg className="absolute top-0 right-0 m-4 h-8 w-8 fill-black dark:fill-white cursor-pointer z-50" onClick={() => setEditNFT(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>

                <div className="absolute top-0 right-0 w-full h-full content-board-view justify-evenly">
                    <input type="number" placeholder="Price" />
                    <input type="text" placeholder="Visibility" />
                    <input type="text" placeholder="Price" />
                </div>
            </div>

        </>

    )
}

export default EditNFT