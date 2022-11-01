import axios from "axios";
export const pagesList = {
    Special: 'Welcome',
    Main: ['Home', 'Explore', 'Galleries', 'About'],
    Sub: ['Create', 'Profile', 'Logs'],
    Button: ['Collection', 'Cart', 'Notification'],
}

export const nftSortType = {
    "Date": ["Newest", "Oldest"],
    "Price": ["Highest Price", "Lowest Price"],
    "Requests": ["Most Requests", "Least Requests"],
    "Purchase times": ["Best selling", "Flop"],
    "Last purchase": ["Most recent", "Longest ago"],
}

export const nftFilterType = {
    "Date": ["Begin", "End"],
    "Price": ["Begin", "End"],
    "Requests": ["Begin", "End"],
    "Purchase times": ["Begin", "End"],
    "Last purchase": ["Begin", "End"],
}

export const collectionSortType = {
    "Date": ["Newest", "Oldest"],
    "Volume": ["Most NFTs", "Least NFTs"],
}

export const collectionFilterType = {
    "Date": ["Begin", "End"],
    "Volume": ["Begin", "End"],
}

export const dateStart = {
    title: "Choose the start date",
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-white/50 dark:bg-black/50 backdrop-lg",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "",
        input: "",
        inputIcon: "",
        selected: "",
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
}

export const dateEnd = {
    title: "Choose the end date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-white/50 dark:bg-black/50 backdrop-lg w-72",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date("2022-01-01"),
    language: "en",
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