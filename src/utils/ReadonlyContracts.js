import IconService from 'icon-sdk-js'

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')

const iconService = new IconService(httpProvider);

const { IconBuilder } = IconService
const { CallBuilder } = IconBuilder


export const getUserCollections = async (_user) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getUserCollections')
        .params({
            _user: _user
        })
        .build()

    const collections = await iconService.call(call).execute()
    return collections;
}

export const getCollectionNFTs = async (_collection) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getCollectionNFTs')
        .params({
            _collection: _collection
        })
        .build()

    const nfts = await iconService.call(call).execute()
    return nfts;
}

export const getNFTRequests = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNFTRequests')
        .params({
            _nft: _nft
        })
        .build()

    const requests = await iconService.call(call).execute()
    return requests;
}

export const getCollectionInfo = async (_collection) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getCollectionInfo')
        .params({
            _collection: _collection
        })
        .build()

    const collectionInfo = await iconService.call(call).execute()
    return collectionInfo;
}

export const getNFTInfo = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNFTInfo')
        .params({
            _nft: _nft
        })
        .build()

    const nftInfo = await iconService.call(call).execute()
    return nftInfo;
}