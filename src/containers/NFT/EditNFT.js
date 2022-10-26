import { useState, useEffect } from 'react'

import { editNFT } from './../../utils/TransactionContracts'


function EditNFT({ address, nft, nftInfo, setEditNFT }) {
    const [editNFTParams, setEditNFTParams] = useState({
        _price: nftInfo[1] / 1e18,
        _description: nftInfo[2],
        _visibility: nftInfo[3] === 'true',
        _onSale: nftInfo[4] === 'true',
    })

    return (
        <>
            <div className='fixed mt-20 w-[60%] h-[70%] top-[10%] left-[20%] rounded-2xl z-50 backdrop-lg'>
                <svg className="absolute top-0 right-0 m-4 h-8 w-8 fill-black dark:fill-white cursor-pointer z-50" onClick={() => setEditNFT(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>


                <div className='place-items-center grid h-full w-full'>
                    <div className="grid overflow-hidden grid-cols-5 grid-rows-4 gap-2 w-4/5">
                        <p className="text-high text-left place-self-center">Price:</p>
                        <input className="col-start-2 col-end-6 place-self-center w-4/5 h-14 px-4 transition input"
                            type="number" placeholder="Price" defaultValue={editNFTParams._price}
                            onChange={(e) => setEditNFTParams({ ...editNFTParams, _price: +e.target.value })} />

                        <p className="text-high text-left w-full place-self-center">Description:</p>
                        <textarea className="col-start-2 col-end-6 place-self-center w-4/5 h-28 px-4 transition input"
                            type="text" placeholder="Description" defaultValue={editNFTParams._description}
                            onChange={(e) => setEditNFTParams({ ...editNFTParams, _description: e.target.value })} />


                        <p className="text-high text-left place-self-center">Visibility:</p>

                        <div className="col-start-2 col-end-4 flex place-self-center place-items-center w-2/3 h-20 ml-14"
                            onChange={(e) => setEditNFTParams({ ...editNFTParams, _visibility: e.target.value === 'true' })} >
                            <input type="radio" id="edit-nft-visibility-true" name="edit-nft-visibility" class="hidden peer" value={true} checked={editNFTParams._visibility} />
                            <label for="edit-nft-visibility-true" class="radio-positive">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Yes</div>
                                    <div class="w-full">Make this NFT public</div>
                                </div>
                            </label>
                        </div>

                        <div className="col-start-4 col-end-6 flex place-self-center place-items-center w-2/3 h-20 mr-14"
                            onChange={(e) => setEditNFTParams({ ...editNFTParams, _visibility: e.target.value === 'true', _onSale: e.target.value === 'true' })} >
                            <input type="radio" id="edit-nft-visibility-false" name="edit-nft-visibility" class="hidden peer" value={false} checked={!editNFTParams._visibility} />
                            <label for="edit-nft-visibility-false" class="radio-negative">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">No</div>
                                    <div class="w-full">Make this NFT private</div>
                                </div>
                            </label>
                        </div>


                        <p className="text-high text-left place-self-center">On sale:</p>

                        <div className="col-start-2 col-end-4 flex place-self-center place-items-center w-2/3 h-20 ml-14"
                            onChange={(e) => setEditNFTParams({ ...editNFTParams, _onSale: e.target.value === 'true' })} >
                            <input type="radio" id="edit-nft-onsale-true" name="edit-nft-onsale" className="hidden peer" value={true} required checked={editNFTParams._onSale} disabled={!editNFTParams._visibility} />
                            <label for="edit-nft-onsale-true" className={editNFTParams._visibility ? "radio-positive" : "radio-disabled"}>
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Yes</div>
                                    <div className="w-full">Sell this NFT</div>
                                </div>
                            </label>
                        </div>

                        <div className="col-start-4 col-end-6 flex place-self-center place-items-center w-2/3 h-20 mr-14"
                            onChange={(e) => setEditNFTParams({ ...editNFTParams, _onSale: e.target.value === 'true' })} >
                            <input type="radio" id="edit-nft-onsale-false" name="edit-nft-onsale" class="hidden peer" value={false} required checked={!editNFTParams._onSale} />
                            <label for="edit-nft-onsale-false" class="radio-negative">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">No</div>
                                    <div class="w-full">Just exhibit this NFT</div>
                                </div>
                            </label>
                        </div>
                        <button className="col-start-2 col-end-5 place-self-center place-items-center  w-full h-12 button-medium rounded-md text-black dark:text-white font-medium cursor-pointer border"
                            onClick={() => editNFT(address, nft, editNFTParams._price, editNFTParams._description, editNFTParams._visibility, editNFTParams._onSale)}>Summit change</button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default EditNFT