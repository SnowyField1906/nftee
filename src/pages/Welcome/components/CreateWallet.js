import { useState } from "react";
import IconService from "icon-sdk-js";

function CreateWallet({ wallet, setTag }) {



    const [view, setView] = useState(false)
    return (
        <div className='grid transform duration-300 ease-in-out w-[60%] select-none'>
            <button className='text-white h-10 w-full' onClick={() => setTag(null)}>close</button>
            <div className='text-black dark:text-white font-semibold text-xl text-center w-full'>
                <p className="text-white h-10 ">New account generated!</p>
            </div>

            <div className="grid w-4/5 justify-self-center">
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

        </div >
    )
}

export default CreateWallet
