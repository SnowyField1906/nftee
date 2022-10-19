import IconService from 'icon-sdk-js'

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')

const iconService = new IconService(httpProvider);


export const getUserCollections = async (user) => {
    const { IconBuilder } = IconService
    const { CallBuilder } = IconBuilder

    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getUserCollections')
        .params({
            _user: user
        })
        .build()

    const collections = await iconService.call(call).execute()

    return collections;
}

export const getCollectionNFTs = async (collection) => {
    const { IconBuilder } = IconService
    const { CallBuilder } = IconBuilder

    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getCollectionNFTs')
        .params({
            _collection: collection
        })
        .build()

    const nfts = await iconService.call(call).execute()

    return nfts;
}

export const getCollectionInfo = async (collection) => {
    const { IconBuilder } = IconService
    const { CallBuilder } = IconBuilder

    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getCollectionInfo')
        .params({
            _collection: collection
        })
        .build()

    const nfts = await iconService.call(call).execute()

    return nfts;
}

export const getNFTInfo = async (nft) => {
    const { IconBuilder } = IconService
    const { CallBuilder } = IconBuilder

    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNFTInfo')
        .params({
            _nft: nft
        })
        .build()

    const nfts = await iconService.call(call).execute()

    return nfts;
}