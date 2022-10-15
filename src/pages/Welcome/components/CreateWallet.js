import { useState } from "react";
import IconService from "icon-sdk-js";
import { Navigate } from "react-router-dom";

function CreateWallet({ wallet, setTag, account, setAccount }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const storeWallet = (password) => {
        const keystoreFile = IconService.IconWallet.loadPrivateKey(wallet.getPrivateKey());
        const fileData = JSON.stringify((keystoreFile.store(password)));
        const blob = new Blob([fileData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "keystore.json";
        link.href = url;
        link.click();
    };

    const redirect = () => {
        setAccount({
            ...account,
            address: wallet.getAddress(),
            login: true
        })
        return (
            <Navigate to="/NFTee/Home" />
        )
    }


    const [view, setView] = useState(false)

    if (account.login) {
        return <Navigate to="/NFTee/Home" />
    }

    return (
        <div className='h-full transform duration-300 ease-in-out w-[60%] select-none '>
            <div className=" h-[5%] w-full flex justify-between ">
                <button className='text-white ml-5' onClick={() => setTag(null)}>Go back</button>
                <button className='text-white mr-5'
                    onClick={redirect}
                >Use this account</button>
            </div>
            <div className='h-[15%] text-black dark:text-white grid'>
                <p className=" font-semibold w-full text-white h-30 text-3xl text-center self-center">New account generated!</p>
            </div>

            <div className='w-full h-[80%] overflow-hidden grid grid-cols-1 grid-rows-2'>
                <div className="grid w-4/5 justify-self-center self-center">
                    <div className='flex rounded-xl bg-gray-200 dark:bg-gray-800'>
                        <div className="w-1/6 py-2 rounded-tl-xl border-2 bg-gray-100 dark:bg-gray-900 border-gray-900 dark:border-gray-100">
                            <p className='pl-4 font-semibold text-black dark:text-white'>Address</p>
                        </div>
                        <div className="w-5/6 py-2 rounded-tr-xl border-y-2 border-r-2 hover:cursor-pointer bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 border-gray-900 dark:border-gray-100">
                            <p className="pl-4  text-black dark:text-white">
                                {wallet.getAddress()}
                            </p>
                        </div>

                    </div>
                    <div className='flex rounded-xl'>
                        <div className="w-1/6 py-2 rounded-bl-xl border-x-2 border-b-2 bg-gray-100 dark:bg-gray-900 border-gray-900 dark:border-gray-100">
                            <p className='pl-4 font-semibold text-black dark:text-white'>Private key</p>
                        </div>
                        <div className="w-5/6 py-2 rounded-br-xl border-b-2 border-r-2 hover:cursor-pointer bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 border-gray-900 dark:border-gray-100">
                            <p className="pl-4  text-black dark:text-white">
                                {view ? wallet.getPrivateKey() : "*".repeat(wallet.getPrivateKey().length)}
                            </p>

                        </div>

                    </div>
                    <button className='text-black dark:text-white text-lg w-full' onClick={() => setView(!view)}>
                        {view ? 'hide' : 'show'}
                    </button>
                </div>

                <div className='grid w-4/5 h-[40%] justify-self-center'>
                    <p className='text-black dark:text-white text-lg'>Or you can download the wallet as a JSON file.</p>
                    <div className="flex">
                        <input className='w-full h-12 rounded-xl invalid:default:border-red-500 default:border-gray-900 default:dark:border-gray-100 bg-gray-200 dark:bg-gray-800 text-black dark:text-white'
                            type="password" placeholder="Password" required={password >= 8}
                            onChange={(e) => setPassword(e.target.value)} />

                        <input className='w-full h-12 rounded-xl invalid:default:border-red-500 default:border-gray-900 default:dark:border-gray-100 bg-gray-200 dark:bg-gray-800 text-black dark:text-white'
                            type="password" placeholder="Confirm password" required={password >= 8}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {password === confirmPassword && password && <button className='text-black dark:text-white text-lg w-min justify-self-center '
                        onClick={() => storeWallet(password)}>Download</button>}
                    {password.length < 8 && <p className='text-red-500 text-center'>Password must be at least 8 characters long.</p>}
                    {password !== confirmPassword && <p className='text-red-500 text-center'>Passwords do not match.</p>}
                </div>

            </div>
        </div >
    )
}

export default CreateWallet
