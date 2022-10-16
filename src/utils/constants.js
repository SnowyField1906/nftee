import axios from "axios";
export const pagesList = {
    Special: 'Welcome',
    Main: ['Home', 'Explore', 'Galleries', 'About'],
    Sub: ['Create', 'Profile', 'Wallet'],
    Button: ['Collection', 'Notification', 'Cart'],
}





// export const findPublicGateWay = (ipfs) => {
//     var url;
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();
//     axios.defaults.timeout = 2000;
//     const getGateway = async () => {
//         const random = Math.floor(Math.random() * publicGateway.length);
//         url = publicGateway[random] + ipfs;
//         console.log(url)

//         axios.get(url, { cancelToken: source.token })
//             .then((res) => {
//                 console.log(res, '');
//             }, (error) => {
//                 if (axios.isCancel(error)) {
//                     console.log('Request canceled', error.message);
//                     getGateway();
//                 } else {
//                     console.log("Gateway found: " + url)
//                     return url;
//                 }
//             }).catch(() => {
//                 getGateway();
//             });
//     };
//     getGateway();

// }

const publicGateway = [
    "https://ipfs.eth.aragon.network/ipfs/",
    "https://ipfs.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.fleek.co/ipfs/",
    "https://ipfs-infura.io/ipfs/",
]

export const findPublicGateWay = (ipfs) => {
    let url;

    const getGateway = async () => {
        const random = Math.floor(Math.random() * publicGateway.length);
        url = publicGateway[random] + ipfs;
        console.log(url)

        try {
            await axios.get(url);

        } catch (error) {
            console.log(error);
            getGateway();
        }
    }
    getGateway();

    console.log("Gateway found: " + url)
    return url;
}
