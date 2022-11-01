import IconService from 'icon-sdk-js'

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')

const iconService = new IconService(httpProvider);

const { IconBuilder } = IconService
const { CallBuilder } = IconBuilder


//======================================//


export const getUsers = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getUsers')
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

    const nfts = await iconService.call(call).execute()
    return nfts;
}

export const getPublicNotifications = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getPublicNotifications')
        .params({
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
        })
        .build()

    const notifications = await iconService.call(call).execute()
    notifications.sort((a, b) => +b.slice(0, 16) - +a.slice(0, 16)).filter((notification) => +notification.slice(0, 16) < Date.now() * 1000);
    let unique = [...new Set(notifications)];
    return unique;
}

//==================//


export const getUserAuctions = async (_user) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getUserAuctions')
        .params({
            _user: _user,
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
        })
        .build()

    const auctions = await iconService.call(call).execute()
    return auctions;
}


export const getUserNotifications = async (_user) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getUserNotifications')
        .params({
            _user: _user,
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
        })
        .build()

    const notifications = await iconService.call(call).execute()
    notifications.sort((a, b) => +b.slice(0, 16) - +a.slice(0, 16)).filter((notification) => +notification.slice(0, 16) < Date.now() * 1000);
    let unique = [...new Set(notifications)];
    return unique;
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

//==================//

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

//==================//

export const getNFTRequests = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNFTRequests')
        .params({
            _nft: _nft,
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
        })
        .build()

    const requests = await iconService.call(call).execute()
    return requests;
}

export const getNFTOwners = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNFTOwners')
        .params({
            _nft: _nft
        })
        .build()

    const owners = await iconService.call(call).execute()
    return owners;
}

export const getNFTFirstRequest = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNFTFirstRequest')
        .params({
            _nft: _nft
        })
        .build()

    const owners = await iconService.call(call).execute()
    return owners;
}

export const getNFTNotifications = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNFTNotifications')
        .params({
            _nft: _nft
        })
        .build()

    const notifications = await iconService.call(call).execute()
    return notifications;
}

//==================//

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
            _nft: _nft,
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
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

    const auctionInfo = await iconService.call(call).execute()
    return auctionInfo;
}

export const getNotificationInfo = async (_notification) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('getNotificationInfo')
        .params({
            _notification: _notification
        })
        .build()

    const notificationInfo = await iconService.call(call).execute()
    return notificationInfo;
}

//======================================//


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

export const value = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('value')
        .params({})
        .build()

    const value = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(value);
}

export const auctionStatus = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('auctionStatus')
        .params({
            _nft: _nft,
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
        })
        .build()

    const status = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(status);
}
//==================//

export const startTime = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('startTime')
        .params({
            _nft: _nft
        })
        .build()

    const time = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(time);
}

export const endTime = async (_nft) => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('endTime')
        .params({
            _nft: _nft
        })
        .build()

    const time = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(time);
}


//======================================//


export const sortedNFTs = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('sortedNFTs')
        .params({
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000),
        })
        .build()

    const nfts = await iconService.call(call).execute()
    Object.keys(nfts).forEach((nft) => {
        nfts[nft][0] = IconService.IconConverter.toNumber(nfts[nft][0])
        nfts[nft][1] = IconService.IconConverter.toNumber(nfts[nft][1] / 1e18)
        nfts[nft][2] = IconService.IconConverter.toNumber(nfts[nft][2])
        nfts[nft][3] = IconService.IconConverter.toNumber(nfts[nft][3])
        nfts[nft][4] = IconService.IconConverter.toNumber(nfts[nft][4])
    })
    return nfts;
}

export const sortedCollections = async () => {
    const call = new CallBuilder()
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .method('sortedCollections')
        .params({})
        .build()

    const collections = await iconService.call(call).execute()
    Object.keys(collections).forEach((collection) => {
        collections[collection][0] = IconService.IconConverter.toNumber(collections[collection][0])
        collections[collection][1] = IconService.IconConverter.toNumber(collections[collection][1])
    })
    return collections;
}