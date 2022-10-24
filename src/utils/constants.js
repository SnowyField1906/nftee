import axios from "axios";
export const pagesList = {
    Special: 'Welcome',
    Main: ['Home', 'Explore', 'Galleries', 'About'],
    Sub: ['Create', 'Profile', 'Wallet'],
    Button: ['Collection', 'Cart', 'Notification'],
}

export const nftSortType = {
    "Date": ["Newest", "Oldest"],
    "Price": ["Lowest Price", "Highest Price"],
    "Requests": ["Least Requests", "Most Requests"],
    "Purchase times": ["Flop", "Best selling"]
}

export const nftFilterType = {
    "Begin": ["Date", "Price", "Requests", "Purchase times"],
    "End": ["Date", "Price", "Requests", "Purchase times"]
}


const publicGateway = [
    // "https://via0.com/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    // "https://ipfs.fleek.co/ipfs/",
    // "https://cf-ipfs.com/ipfs/",
    // "https://gateway.ipfs.io/ipfs/",
    // "https://dweb.link/ipfs/",
    // "https://ipfs.io/ipfs/",
    // "https://infura-ipfs.io/ipfs/",
    // "https://gateway.pinata.cloud/ipfs/",
    // "https://ipfs.2read.net/ipfs/",

    // "https://ipfs.eth.aragon.network/ipfs/",
    // "https://ipfs-infura.io/ipfs/",
]

export const findPublicGateWay = (ipfs) => {
    let url;

    if (!ipfs || ipfs.length !== 46) return;

    const getGateway = async () => {
        const random = Math.floor(Math.random() * publicGateway.length);
        url = publicGateway[random] + ipfs;

        try {
            await axios.get(url);

        } catch (error) {
            console.log(error);
            getGateway();
        }
    }
    getGateway();

    return url;
}