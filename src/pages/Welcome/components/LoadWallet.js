import { useState } from "react";
import { Navigate } from "react-router-dom";

import IconService from "icon-sdk-js";

function LoadWallet({ setTag, account, setAccount }) {
    const [keystoreFile, setKeystoreFile] = useState(null);
    const [view, setView] = useState(false);
    const [password, setPassword] = useState("")
    const [loadAccount, setLoadAccount] = useState({
        address: null,
        privateKey: null,
    })

    const loadWalletByPrivateKey = (privateKey) => {
        const walletLoadedByPrivateKey = IconService.IconWallet.loadPrivateKey(privateKey);
        return {
            address: walletLoadedByPrivateKey.getAddress(),
            privateKey: walletLoadedByPrivateKey.getPrivateKey()
        }
    }

    const loadWalletByFile = (keystoreFile, password) => {
        const keystore = IconService.IconWallet.loadKeystore(keystoreFile, password);
        setLoadAccount({
            address: keystore.getAddress(),
            privateKey: keystore.getPrivateKey()
        })
    }

    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            setKeystoreFile(JSON.parse(e.target.result));
        };
    };

    const handleLoad = () => {
        if (loadWalletByFile(keystoreFile, password)) {
            setAccount({
                address: keystoreFile.address,
                privateKey: keystoreFile.privateKey
            })
        }
    }

    const redirect = () => {
        setAccount({
            ...account,
            address: loadAccount.address,
            login: true
        })
    }

    if (account.login) {
        return <Navigate to="/NFTee/Home" />
    }


    return (
        <div className="grid w-1/2 self-center justify-self-center place-self-center">
            <div className=" h-10 w-full flex justify-between">
                <button className='text-white' onClick={() => setTag(null)}>Go back</button>
                <button className='text-white'
                    onClick={redirect}
                >Use this account</button>
            </div>
            <h1>Upload Json file - Example</h1>

            <input type="file" onChange={handleChange} />

            <input type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLoad}>Load</button>


            {loadAccount.address && loadAccount.privateKey && <div className="grid w-4/5 justify-self-center">
                <div className='flex rounded-xl bg-gray-200 dark:bg-gray-800'>
                    <div className="w-1/6 py-2 rounded-tl-xl border-2 bg-gray-100 dark:bg-gray-900 border-gray-900 dark:border-gray-100">
                        <p className='pl-4 font-semibold text-black dark:text-white'>Address</p>
                    </div>
                    <div className="w-5/6 py-2 rounded-tr-xl border-y-2 border-r-2 hover:cursor-pointer bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 border-gray-900 dark:border-gray-100">
                        <p className="pl-4  text-black dark:text-white">
                            {loadAccount.address}
                        </p>
                    </div>

                </div>
                <div className='flex rounded-xl'>
                    <div className="w-1/6 py-2 rounded-bl-xl border-x-2 border-b-2 bg-gray-100 dark:bg-gray-900 border-gray-900 dark:border-gray-100">
                        <p className='pl-4 font-semibold text-black dark:text-white'>Private key</p>
                    </div>
                    <div className="w-5/6 py-2 rounded-br-xl border-b-2 border-r-2 hover:cursor-pointer bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 border-gray-900 dark:border-gray-100">
                        <p className="pl-4  text-black dark:text-white">
                            {view ? loadAccount.privateKey : "*".repeat(loadAccount.privateKey.length)}
                        </p>

                    </div>

                </div>
                <button className='text-black dark:text-white text-lg w-full' onClick={() => setView(!view)}>
                    {view ? 'hide' : 'show'}
                </button>
            </div>
            }

        </div>
    )
}

export default LoadWallet
