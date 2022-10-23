import IconService from 'icon-sdk-js'

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')

const iconService = new IconService(httpProvider);

const { IconBuilder } = IconService
const { CallBuilder } = IconBuilder

export const users = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('users')
        .build()

    const users = await iconService.call(call).execute()
    return users;
}

export const getPublicCollections = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getPublicCollections')
        .params({})
        .build()

    const collections = await iconService.call(call).execute()
    return collections;
}

export const getPublicNFTs = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getPublicNFTs')
        .params({})
        .build()

    const collections = await iconService.call(call).execute()
    return collections;
}

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

export const getUserCustomCollections = async (_user) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getUserCustomCollections')
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

export const getCollectionPublicNFTs = async (_collection) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getCollectionPublicNFTs')
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

export const getAuctionInfo = async (_auction) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getAuctionInfo')
        .params({
            _auction: _auction
        })
        .build()

    const nftInfo = await iconService.call(call).execute()
    return nftInfo;
}

export const balance = async (_user) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('balance')
        .params({
            _user: _user
        })
        .build()

    const balance = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(balance);
}

export const payableBalance = async (_user) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('payableBalance')
        .params({
            _user: _user
        })
        .build()

    const balance = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(balance);
}