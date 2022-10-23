import { useState } from "react"
import { createCollection } from "./../../utils/TransactionContracts"

function CreateCollection({ address, setCreateCollection }) {
    const [createCollectionParams, setCreateCollectionParams] = useState({
        _user: address,
        _name: "",
        _description: "",
        _visibility: false,
    })

    return (
        <div className='grid fixed mt-20 w-[60vw] h-[80vh] top-[5vh] left-[20vw] rounded-2xl z-50 backdrop-lg'>
            <svg className="absolute top-0 right-0 m-4 z-50 h-8 w-8 fill-black dark:fill-white cursor-pointer" onClick={() => setCreateCollection(false)}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
            </svg>

            {/* <div className='grid h-[10vh] justify-self-center place-items-center justify-items-end'>
                <p className='text-4xl font-bold text-black dark:text-white w-full self-center'>Create Collection</p>
            </div> */}

            <div className="grid w-3/4 h-[70vh] self-center justify-self-center overflow-hidden grid-cols-5 grid-rows-4 gap-2 ">
                <p className="text-high text-left w-full place-self-center">Name:</p>
                <input className="col-start-2 col-end-6 place-self-center w-4/5 h-14 px-4 transition input"
                    type="text" placeholder="Name"
                    onChange={(e) => setCreateCollectionParams({ ...createCollectionParams, _name: e.target.value })} />

                <p className="text-high text-left w-full place-self-center">Description:</p>
                <textarea className="col-start-2 col-end-6 place-self-center w-4/5 h-28 px-4 transition input"
                    type="text" placeholder="Description"
                    onChange={(e) => setCreateCollectionParams({ ...createCollectionParams, _description: e.target.value })} />

                <p className="text-high text-left w-full place-self-center">Visibility:</p>

                <div className="col-start-2 col-end-4 flex place-self-center place-items-center w-3/4 h-20 ml-14"
                    onChange={(e) => setCreateCollectionParams({ ...createCollectionParams, _visibility: e.target.value === 'true' })} >
                    <input type="radio" id="collection-visibility-true" name="collection-visibility" class="hidden peer" value={true} required checked={createCollectionParams._visibility} />
                    <label for="collection-visibility-true" class="inline-flex justify-between items-center p-5 w-full radio-positive">
                        <div class="block">
                            <div class="w-full text-lg font-semibold">Yes</div>
                            <div class="w-full">Make this collection public</div>
                        </div>
                    </label>
                </div>

                <div className="col-start-4 col-end-6 flex place-self-center place-items-center w-3/4 h-20 mr-14"
                    onChange={(e) => setCreateCollectionParams({ ...createCollectionParams, _visibility: e.target.value === 'true' })} >
                    <input type="radio" id="collection-visibility-false" name="collection-visibility" class="hidden peer" value={false} required checked={!createCollectionParams._visibility} />
                    <label for="collection-visibility-false" class="inline-flex justify-between items-center p-5 w-full radio-negative">
                        <div class="block">
                            <div class="w-full text-lg font-semibold">No</div>
                            <div class="w-full">Make this collection private</div>
                        </div>
                    </label>
                </div>

                <button className="col-start-2 col-end-5 place-self-center place-items-center  w-full h-12 button-medium rounded-md text-black dark:text-white font-medium cursor-pointer border"
                    onClick={() => createCollection(createCollectionParams._user, createCollectionParams._name, createCollectionParams._description, createCollectionParams._visibility)}>Create</button>
            </div>
        </div>
    )
}

export default CreateCollection
