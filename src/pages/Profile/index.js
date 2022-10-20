import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import IconService from 'icon-sdk-js';
import { getUserCollections, getCollectionNFTs } from '../../utils/ReadonlyContracts';
import SmallCollection from '../../containers/Collection/SmallCollection';
import SmallNFT from '../../containers/NFT/SmallNFT';

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')
const iconService = new IconService(httpProvider);


function Profile({ account }) {
  const [balance, setBalance] = useState('')
  const [collections, setCollections] = useState([])
  const [nfts, setNFTs] = useState([])


  useEffect(() => {
    const getBalance = async () => {
      const balance = await iconService.getBalance(account.address).execute();
      const balanceValue = (IconService.IconAmount.of(balance, IconService.IconAmount.Unit.ICX) / 10e17).toString();
      setBalance(balanceValue)
    }
    getBalance();

    const collectionsAwait = async () => {
      await getUserCollections(account.address).then((res) => {
        setCollections(res)
      })
    }
    collectionsAwait();

    const nftsAwait = async () => {
      await getCollectionNFTs(account.address + "/owning").then((res) => {
        setNFTs(res)
      })
    }
    nftsAwait();
  }, [])

  const splitArrayForSlider = (array, size) => {
    const result = [];
    console.log(result)
    for (let i = 0; i < array.length - size; i++) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  const ntfsForSlider = splitArrayForSlider(nfts, 5);

  const [slider, setSlider] = useState(0);
  const nextSlider = () => {
    if (slider < ntfsForSlider.length - 1) {
      setSlider(slider + 1)
    }
  }
  const prevSlider = () => {
    if (slider > 0) {
      setSlider(slider - 1)
    }
  }
  const handleSlider = (e) => {
    setSlider(e.target.value)
  }

  console.log(ntfsForSlider)

  const customCollections = collections.filter((collection) => (collection !== account.address + '/owning' && collection !== account.address + '/cart'))


  if (account.login === false) {
    return (
      <Navigate to="/NFTee" />
    )
  }

  return (
    <div className='page-bg h-screen place-items-center'>
      <div className="grid px-10 py-32 w-full">
        <p className="text-huge">{account.address}</p>
        <p className="text-huge">{balance}</p>
      </div>
      <div className="">
        {!nfts ?
          <p className="text-huge">Create your first NFTs</p>
          :
          <div className="grid w-full justify-items-center place-items-center">
            <p className="text-huge">Your owning NFTs</p>
            <div className="relative carousel carousel-center w-11/12 p-5 space-x-10 bg-neutral rounded-box flex justify-evenly justify-self-center place-items-center">
              {
                ntfsForSlider[slider] && ntfsForSlider[slider].map((nft) => {
                  return (
                    <div className="carousel-item">
                      <SmallNFT nft={nft} />
                    </div>
                  )
                })
              }
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={nextSlider} className="btn btn-circle">❮</button>
                <button onClick={prevSlider} className="btn btn-circle">❯</button>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="mt-20">
        {!customCollections || !customCollections.length ?
          <p className="text-huge ">Create your first custom collection</p>
          :
          <div className="grid w-full justify-items-center place-items-center">
            <p className="text-huge">Your custom collections</p>
            <div className="relative carousel carousel-center w-11/12 p-5 space-x-10 bg-neutral rounded-box">
              {
                customCollections.map((collection) => {
                  return (
                    <div className="carousel-item">
                      <SmallCollection collection={collection} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Profile
