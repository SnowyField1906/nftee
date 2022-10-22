import { useState, useEffect } from 'react'

import { editCollectionInfo } from './../../utils/TransactionContracts'


function EditCollection({ address, collection, collectionInfo, setEditCollection }) {
    const [editCollectionParams, setEditCollectionParams] = useState({
        _name: collectionInfo[0],
        _description: collectionInfo[1],
        _visibility: collectionInfo[2] === 'true'
    })

    return (
        <>
            <div className='fixed mt-20 w-[60%] h-[70%] top-[10%] left-[20%] rounded-2xl z-50 backdrop-lg'>
                <svg className="absolute top-0 right-0 m-4 h-8 w-8 fill-black dark:fill-white cursor-pointer z-50" onClick={() => setEditCollection(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>


                <div className='place-items-center grid h-full w-full'>
                    <div className="grid overflow-hidden grid-cols-5 grid-rows-4 gap-2 w-4/5">
                        <p className="text-high text-left place-self-center">Name:</p>
                        <input className="col-start-2 col-end-6 place-self-center w-4/5 h-14 px-4 transition input"
                            type="text" placeholder="Name" defaultValue={collectionInfo[0]}
                            onChange={(e) => setEditCollectionParams({ ...editCollectionParams, _name: e.target.value })} />

                        <p className="text-high text-left place-self-center">Description:</p>
                        <input className="col-start-2 col-end-6 place-self-center w-4/5 h-14 px-4 transition input"
                            type="text" placeholder="Description" defaultValue={collectionInfo[1]}
                            onChange={(e) => setEditCollectionParams({ ...editCollectionParams, _name: e.target.value })} />

                        <p className="text-high text-left place-self-center">Visibility:</p>

                        <div className="col-start-2 col-end-4 flex place-self-center place-items-center w-3/4 h-20 ml-14"
                            onChange={(e) => setEditCollectionParams({ ...editCollectionParams, _visibility: e.target.value === 'true' })} >
                            <input type="radio" id="edit-collection-visibility-true" name="edit-collection-visibility" class="hidden peer" value={true} checked={editCollectionParams._visibility} />
                            <label for="edit-collection-visibility-true" class="radio-positive">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Yes</div>
                                    <div class="w-full">Make this collection public</div>
                                </div>
                            </label>
                        </div>

                        <div className="col-start-4 col-end-6 flex place-self-center place-items-center w-3/4 h-20 mr-14"
                            onChange={(e) => setEditCollectionParams({ ...editCollectionParams, _visibility: e.target.value === 'true' })} >
                            <input type="radio" id="edit-collection-visibility-false" name="edit-collection-visibility" class="hidden peer" value={false} checked={!editCollectionParams._visibility} />
                            <label for="edit-collection-visibility-false" class="radio-negative">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">No</div>
                                    <div class="w-full">Make this collection private</div>
                                </div>
                            </label>
                        </div>


                        <button className="col-start-2 col-end-5 place-self-center place-items-center  w-full h-12 button-medium rounded-md text-black dark:text-white font-medium cursor-pointer"
                            onClick={() => editCollectionInfo(address, collection, editCollectionParams._name, editCollectionParams._description, editCollectionParams._visibility)}>Summit change</button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default EditCollection