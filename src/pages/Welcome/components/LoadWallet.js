import { useState } from "react";
import { Navigate } from "react-router-dom";

import IconService from "icon-sdk-js";

function LoadWallet({ setTag, account, setAccount }) {
    const [keystoreFile, setKeystoreFile] = useState(null);
    const [view, setView] = useState(false);
    const [keyInput, setKeyInput] = useState('');
    const [password, setPassword] = useState("")
    const [loadAccount, setLoadAccount] = useState({
        address: null,
        privateKey: null,
    })

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

    const handleLoadFile = () => {
        if (loadWalletByFile(keystoreFile, password)) {
            setLoadAccount({
                address: keystoreFile.address,
                privateKey: keystoreFile.privateKey
            })
        }
    }

    const handleLoadKey = () => {
        const key = IconService.IconWallet.loadPrivateKey(keyInput);
        setLoadAccount({
            address: key.getAddress(),
            privateKey: key.getPrivateKey()
        })
    }


    const redirect = () => {
        if (loadAccount.address) {
            setAccount({
                ...account,
                address: loadAccount.address,
                login: true
            })
        }
    }

    if (account.login) {
        return <Navigate to="/NFTee/Home" />
    }


    return (
        <div className='flex-col h-full transform duration-300 ease-in-out w-[60%] select-none overflow-hidden'>

            <div className="h-[5%] w-[95%] flex justify-between mt-3 pb-3 border-b-[1px] border-black dark:border-white border-opacity-50 ml-[2.5%]">
                <div className="flex ml-5 hover:-translate-x-2 transform duration-300 ">
                    <svg className="h-full fill-black dark:fill-white"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10.957,12.354a.5.5,0,0,1,0-.708l4.586-4.585a1.5,1.5,0,0,0-2.121-2.122L8.836,9.525a3.505,3.505,0,0,0,0,4.95l4.586,4.586a1.5,1.5,0,0,0,2.121-2.122Z" />
                    </svg>
                    <button className='text-black dark:text-white font-semibold' onClick={() => setTag(null)}>Go back</button>
                </div>
                <div className="flex mr-5 hover:translate-x-2 transform duration-300 ">
                    <button className='text-black dark:text-white font-semibold'
                        onClick={redirect}
                    >Use this account</button>
                    <svg className="h-full fill-black dark:fill-white"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.75,9.525,11.164,4.939A1.5,1.5,0,0,0,9.043,7.061l4.586,4.585a.5.5,0,0,1,0,.708L9.043,16.939a1.5,1.5,0,0,0,2.121,2.122l4.586-4.586A3.505,3.505,0,0,0,15.75,9.525Z" />
                    </svg>
                </div>
            </div>

            <div className='h-[25%] w-[60%] ml-[20%] text-black dark:text-white grid mt-10 border-2 border-black/70 dark:border-white/70 rounded-xl items-center'>
                <p className='text-black dark:text-white text-lg text-center'>Load wallet with private key</p>

                <div className='grid w-[90%] justify-self-center'>
                    <div className="flex justify-evenly">
                        <input className='self-center w-[70%] h-12 my-5 rounded-xl invalid:default:border-red-500 default:border-gray-900 default:dark:border-gray-100 bg-white/50 dark:bg-black/50 text-black dark:text-white'
                            type="password" placeholder="Private key" required={password >= 8}
                            onChange={(e) => setKeyInput(e.target.value)} />
                    </div>
                    <button className='text-black dark:text-white text-xl font-semibold w-min justify-self-center' onClick={handleLoadKey}>Load</button>
                </div>
            </div>


            <div className='h-[25%] w-[60%] ml-[20%] text-black dark:text-white grid mt-10 border-2 border-black/70 dark:border-white/70 rounded-xl items-center'>
                <p className='text-black dark:text-white text-lg text-center'>Load wallet with JSON file</p>

                <div className='grid w-[90%] justify-self-center'>
                    <div className="flex justify-between">
                        <input className="self-center h-12 w-[47%] text-xl" type="file" onChange={handleChange} />
                        <input className='self-center w-[47%] h-12 my-5 rounded-xl invalid:default:border-red-500 default:border-gray-900 default:dark:border-gray-100 bg-white/50 dark:bg-black/50 text-black dark:text-white'
                            type="password" placeholder="Password" required={password >= 8}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='text-black dark:text-white text-xl font-semibold w-min justify-self-center' onClick={handleLoadFile}>Load</button>

                </div>
            </div>



            <div className='w-full h-[40%] overflow-hidden grid grid-cols-1 grid-rows-2 mt-10 items-center'>
                <div className="grid w-4/5 justify-self-center self-center">
                    <div className='flex h-14 rounded-xl '>
                        <div className="w-1/5 h-14 flex place-items-center rounded-tl-xl border-2 bg-white/50 dark:bg-black/50 border-black/70 dark:border-white/70">
                            <p className='pl-4 font-semibold text-black dark:text-white'>Address</p>
                        </div>
                        <div className="flex justify-between place-items-center w-4/5 h-14 rounded-tr-xl border-y-2 border-r-2 hover:cursor-pointer bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border-black/70 dark:border-white/70">
                            <p className="pl-4  text-black dark:text-white">
                                {loadAccount.address ?? "no data"}
                            </p>
                            <svg className="w-7 h-7 mr-4 fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                onClick={() => { navigator.clipboard.writeText(loadAccount.address) }}
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className='flex rounded-xl'>
                        <div className="flex justify-between place-items-center h-14 w-1/5 rounded-bl-xl border-x-2 border-b-2 bg-white/50 dark:bg-black/50 border-black/70 dark:border-white/70">
                            <p className='pl-4 font-semibold text-black dark:text-white'>Private key</p>
                            {view ?
                                <svg className="w-7 h-7 mr-4 fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                    onClick={() => setView(false)}
                                    xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.19 512.19" space="preserve" >
                                    <g>
                                        <path d="M496.543,200.771c-19.259-31.537-43.552-59.707-71.915-83.392l59.733-59.733c8.185-8.475,7.95-21.98-0.525-30.165   c-8.267-7.985-21.374-7.985-29.641,0l-64.96,65.045c-40.269-23.918-86.306-36.385-133.141-36.053   c-132.075,0-207.339,90.411-240.448,144.299c-20.862,33.743-20.862,76.379,0,110.123c19.259,31.537,43.552,59.707,71.915,83.392   l-59.733,59.733c-8.475,8.185-8.71,21.691-0.525,30.165c8.185,8.475,21.691,8.71,30.165,0.525c0.178-0.172,0.353-0.347,0.525-0.525   l65.109-65.109c40.219,23.915,86.201,36.402,132.992,36.117c132.075,0,207.339-90.411,240.448-144.299   C517.405,277.151,517.405,234.515,496.543,200.771z M128.095,255.833c-0.121-70.575,56.992-127.885,127.567-128.006   c26.703-0.046,52.75,8.275,74.481,23.793l-30.976,30.976c-13.004-7.842-27.887-12.022-43.072-12.096   c-47.128,0-85.333,38.205-85.333,85.333c0.074,15.185,4.254,30.068,12.096,43.072l-30.976,30.976   C136.414,308.288,128.096,282.394,128.095,255.833z M256.095,383.833c-26.561-0.001-52.455-8.319-74.048-23.787l30.976-30.976   c13.004,7.842,27.887,12.022,43.072,12.096c47.128,0,85.333-38.205,85.333-85.333c-0.074-15.185-4.254-30.068-12.096-43.072   l30.976-30.976c41.013,57.434,27.702,137.242-29.732,178.255C308.845,375.558,282.798,383.879,256.095,383.833z" />
                                    </g>
                                </svg> :
                                <svg className="w-7 h-7 mr-4 fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                    onClick={() => setView(true)}
                                    xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.19 512.19" space="preserve">
                                    <g>
                                        <circle cx="256.095" cy="256.095" r="85.333" />
                                        <path d="M496.543,201.034C463.455,147.146,388.191,56.735,256.095,56.735S48.735,147.146,15.647,201.034   c-20.862,33.743-20.862,76.379,0,110.123c33.088,53.888,108.352,144.299,240.448,144.299s207.36-90.411,240.448-144.299   C517.405,277.413,517.405,234.777,496.543,201.034z M256.095,384.095c-70.692,0-128-57.308-128-128s57.308-128,128-128   s128,57.308,128,128C384.024,326.758,326.758,384.024,256.095,384.095z" />
                                    </g>
                                </svg>
                            }
                        </div>
                        <div className="flex w-4/5 h-14 justify-between place-items-center rounded-br-xl border-b-2 border-r-2 hover:cursor-pointer bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border-black/70 dark:border-white/70">
                            <p className="pl-4 text-black dark:text-white">
                                {loadAccount.privateKey ? (view ? loadAccount.privateKey : "*".repeat(64)) : "no data"}
                            </p>
                            <svg className="w-7 h-7 mr-4 fill-black/30 dark:fill-white/30 hover:fill-black/50 dark:hover:fill-white/50"
                                onClick={() => { navigator.clipboard.writeText(loadAccount.privateKey) }}
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>






    )
}

export default LoadWallet
