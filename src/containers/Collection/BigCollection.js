import { useEffect, useState } from "react"
import { findPublicGateWay } from "../../utils/constants"
import { deleteCollection, removeNFT } from "../../utils/TransactionContracts";
import { getCollectionNFTs } from "../../utils/ReadonlyContracts";
import { dateConventer } from "../../utils/helpers";

import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import './styles.css';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import BigNFT from "../NFT/BigNFT";

import Edit from "./components/Edit";
import Delete from "./components/Delete";
import EditCollection from "./EditCollection";


function BigCollection({ address, collection, collectionInfo, nfts, setBigCollection }) {
    const [editCollection, setEditCollection] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [realQuality, setRealQuality] = useState(0);

    const nftsAwait = async () => {
        await getCollectionNFTs(collection).then((res) => {
            setRealQuality(res.length)
        })
    }
    useEffect(() => {
        nftsAwait();
    }, [editCollection, setBigCollection])

    const showQuality = () => {
        return `${nfts.length}/${realQuality} ${realQuality > 1 ? " NFTs" : " NFT"} (${realQuality - nfts.length} hidden)`
    }

    return (
        <>
            {/* {bigNFT &&
                <div className="fixed w-screen h-screen z-30">
                    <BigNFT address={address} nft={nft} setBigNFT={setBigNFT} />
                </div>} */}

            {editCollection &&
                <div className="fixed w-screen h-screen z-40">
                    <EditCollection address={address} collection={collection} collectionInfo={collectionInfo} setEditCollection={setEditCollection} />
                </div>}

            <div className='fixed mt-20 w-[80vw] h-[80vh] top-[5vh] left-[10vw] rounded-2xl z-30 backdrop-lg'>
                <svg className="absolute top-0 right-0 m-4 z-50 h-8 w-8 fill-black dark:fill-white cursor-pointer" onClick={() => setBigCollection(false)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <g id="_01_align_center" data-name="01 align center"><polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></g>
                </svg>

                <div className="absolute top-0 right-0 w-full h-full grid grid-cols-2 grid-rows-1">
                    <div className="flex-col h-full w-full border-r border-black/30 dark:border-white/30 bg- bg-contain bg-no-repeat bg-center overflow-hidden rounded-y-lg rounded-l-lg px-2"
                    >
                        <div className="w-full h-[80%] py-5">
                            <Swiper
                                style={{
                                    "--swiper-navigation-color": "#fff",
                                    "--swiper-pagination-color": "#fff",
                                }}
                                // onSwiper={(swiper) => setNFT(nfts[swiper.activeIndex - 1])}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >
                                {nfts.map((nft) => {
                                    return (
                                        <>
                                            <SwiperSlide>
                                                <div
                                                    className="relative w-full h-full bg- bg-contain bg-no-repeat bg-center overflow-hidden rounded-lg"
                                                    style={{
                                                        backgroundImage: `url(${findPublicGateWay(nft)})`,
                                                    }}
                                                // onClick={() => setBigNFT(true)}
                                                >
                                                </div>
                                            </SwiperSlide>
                                        </>

                                    )
                                })}
                            </Swiper>
                        </div>
                        <div className="w-full h-[20%] pb-5">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                // slidesPerView={nfts.length}
                                slidesPerView={nfts.length > 3 ? Math.ceil(nfts.length / 3) : nfts.length}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper cursor-pointer"
                            >
                                {nfts.map((nft, i) => {
                                    return (
                                        <SwiperSlide>
                                            <div
                                                className="relative w-full h-full bg- bg-cover bg-center overflow-hidden rounded-lg"
                                                style={{
                                                    backgroundImage: `url(${findPublicGateWay(nft)})`,
                                                }}>
                                            </div>
                                        </SwiperSlide>

                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>

                    <div className=" h-full w-full grid place-items-center justify-items-center">
                        <div className=" w-5/6 grid">
                            <div className='flex h-14 rounded-xl '>
                                <div className="w-1/4 h-14 flex place-items-center rounded-tl-xl border-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Owner</p>
                                </div>
                                <div className="flex justify-between place-items-center w-3/4 h-14 button-light rounded-tr-xl border-y-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 cursor-pointer text-black dark:text-white hover:underline">
                                        {collection.split('/')[0]}
                                    </p>
                                    <svg className="w-7 h-7 mr-4 cursor-pointer fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                        onClick={() => { navigator.clipboard.writeText(collection.split('/')[0]) }}
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Name</p>
                                </div>
                                <div className="flex w-3/4 h-14 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {collectionInfo[0]}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Quality</p>
                                </div>
                                <div className="flex w-3/4 h-14 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {showQuality()}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Visibility</p>
                                </div>
                                <div className="flex w-3/4 h-14 justify-between place-items-center button-light border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {collectionInfo[2] === 'true' ? 'Public' : 'Private'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex rounded-xl'>
                                <div className="flex justify-between place-items-center h-14 w-1/4 rounded-bl-xl border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/30 dark:border-white/30">
                                    <p className='pl-6 font-semibold text-black dark:text-white'>Date created</p>
                                </div>
                                <div className="flex w-3/4 h-14 justify-between place-items-center button-light rounded-br-xl border-b-2 border-r-2 border-black/30 dark:border-white/30">
                                    <p className="pl-4 text-black dark:text-white">
                                        {dateConventer(collectionInfo[3])}
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="w-3/4 h-60  button-light rounded-lg">
                            <div className="pl-4 border-b-2 pb-2 border-black/30 dark:border-white/30 flex">
                                <p className='text-medium text-lg place-self-center'>Description</p>
                            </div>
                            <div className="w-full text-black dark:text-white pl-4 pt-2">
                                {collectionInfo[1]}
                            </div>
                        </div>
                        {address === collection.split('/')[0] && <div className="h-36 w-3/4 grid grid-rows-2 grid-cols-2 place-items-center">
                            <div className='flex h-14 w-11/12 button-medium rounded-xl'
                                onClick={() => setEditCollection(true)}>
                                <div className="self-center mx-1">
                                    <Edit />
                                </div>
                                <p className="text-medium w-5/6 text-center justify-self-center self-center cursor-pointer">Edit Information</p>
                            </div>
                            <div className='flex h-14 w-11/12 button-medium rounded-xl'
                                onClick={() => deleteCollection(address, collection)}>
                                <div className="self-center mx-1">
                                    <Delete />
                                </div>
                                <p className="text-medium w-5/6 text-center justify-self-center self-center cursor-pointer">Delete collection</p>
                            </div>

                        </div>
                        }
                    </div>
                </div >
            </div >
        </>
    )
}

export default BigCollection
