import { findPublicGateWay } from "../../utils/constants"
import { addToCart } from "../../utils/TransactionContracts"

function BigNFT({ setBigNFT, nft, nftInfo }) {
    console.log(nftInfo)

    return (
        <div className='fixed mt-20 w-[80vw] h-[80vh] top-[5vh] left-[10vw] rounded-2xl z-40 backdrop-lg'>
            <div className='absolute top-0 right-0 m-4 z-30'>
                <svg className="h-8 w-8 fill-black dark:fill-white cursor-pointer" onClick={() => setBigNFT(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>
            </div>

            <div className="absolute top-0 right-0 w-full h-full grid grid-cols-2 grid-rows-1 z-0">
                <div className="h-full border-r border-black/70 dark:border-white/70 bg- bg-contain bg-no-repeat bg-center overflow-hidden rounded-y-lg rounded-l-lg"
                    style={{
                        backgroundImage: `url(${findPublicGateWay(nft)})`,
                    }}>
                </div>

                <div className="h-full w-full px-20 grid">
                    <div className="h-56 w-full my-20 grid">
                        <div className='flex h-14 rounded-xl '>
                            <div className="w-1/5 h-14 flex place-items-center rounded-tl-xl border-2 bg-white/50 dark:bg-black/50 border-black/70 dark:border-white/70">
                                <p className='pl-4 font-semibold text-black dark:text-white'>Owner</p>
                            </div>
                            <div className="flex justify-between place-items-center w-4/5 h-14 rounded-tr-xl border-y-2 border-r-2 hover:cursor-pointer bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border-black/70 dark:border-white/70">
                                <p className="pl-4  text-black dark:text-white">
                                    {nftInfo[0]}
                                </p>
                                <svg className="w-7 h-7 mr-4 fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                    onClick={() => { navigator.clipboard.writeText(nftInfo[0]) }}
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="flex justify-between place-items-center h-14 w-1/5 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/70 dark:border-white/70">
                                <p className='pl-4 font-semibold text-black dark:text-white'>Price</p>
                            </div>
                            <div className="flex w-4/5 h-14 justify-between place-items-center border-b-2 border-r-2 hover:cursor-pointer bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border-black/70 dark:border-white/70">
                                <p className="pl-4 text-black dark:text-white">
                                    {nftInfo[1] / 1e9} ICX
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="flex justify-between place-items-center h-14 w-1/5 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/70 dark:border-white/70">
                                <p className='pl-4 font-semibold text-black dark:text-white'>Visibility</p>
                            </div>
                            <div className="flex w-4/5 h-14 justify-between place-items-center border-b-2 border-r-2 hover:cursor-pointer bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border-black/70 dark:border-white/70">
                                <p className="pl-4 text-black dark:text-white">
                                    {nftInfo[2] === 'true' ? "Public" : "Private"}

                                </p>
                            </div>
                        </div>
                        <div className='flex rounded-xl'>
                            <div className="flex justify-between place-items-center h-14 w-1/5 rounded-bl-xl border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/70 dark:border-white/70">
                                <p className='pl-4 font-semibold text-black dark:text-white'>Status</p>
                            </div>
                            <div className="flex w-4/5 h-14 justify-between place-items-center rounded-br-xl border-b-2 border-r-2 hover:cursor-pointer bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border-black/70 dark:border-white/70">
                                <p className="pl-4 text-black dark:text-white">
                                    {nftInfo[3] === 'true' ? "On Sale" : "Not On Sale"}
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="h-56 w-full grid">
                        <div className='grid h-14 w-60 button-medium'>
                            <p className="text-medium text-center self-center">Add to collection</p>
                        </div>
                        <div className='grid h-14 w-60 button-medium'
                            onClick={() => { addToCart(nftInfo[0], nft) }}>
                            <p className="text-medium text-center self-center">Add to cart</p>
                        </div>
                        <div className='grid h-14 w-60 button-medium'>
                            <p className="text-medium text-center self-center">Send purchase request</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BigNFT
