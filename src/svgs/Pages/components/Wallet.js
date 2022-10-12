function Wallet({ active }) {
    if (active) {
        return (
            <div className="w-full h-12 grid relative self-center
                transform duration-300 rounded-2xl
                bg-gradient-to-r from-blue-400 dark:from-blue-700 to-violet-400 dark:to-violet-700">
                <svg className="w-8 h-8 ml-2 absolute self-center fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21,6H5c-.859,0-1.672-.372-2.235-.999,.55-.614,1.349-1.001,2.235-1.001H23c1.308-.006,1.307-1.995,0-2H5C2.239,2,0,4.239,0,7v10c0,2.761,2.239,5,5,5H21c1.657,0,3-1.343,3-3V9c0-1.657-1.343-3-3-3Zm-1,9c-1.308-.006-1.308-1.994,0-2,1.308,.006,1.308,1.994,0,2Z" />
                </svg>
                <p className="fixed left-[52px] float-right self-center font-bold text-lg text-white">Wallet</p>
            </div>
        )
    }
    return (
        <div className="w-12 hover:w-full h-12 grid relative self-center
            overflow-hidden transform duration-300 border-4
            rounded-2xl border-slate-800 dark:border-slate-200 hover:border-violet-800 dark:hover:border-violet-200
            text-slate-800 dark:text-state-200 hover:text-violet-800 dark:hover:text-violet-200
            fill-slate-800 dark:fill-slate-200 hover:fill-violet-800 dark:hover:fill-violet-200">
            <svg className="w-8 h-8 ml-1 absolute self-center"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M20.5,6H5.5c-.789,0-1.53-.376-2-.999,.457-.607,1.184-1.001,2-1.001H22.5c1.972-.034,1.971-2.967,0-3H5.5C2.468,1,0,3.467,0,6.5v11c0,3.033,2.468,5.5,5.5,5.5h15c1.93,0,3.5-1.57,3.5-3.5V9.5c0-1.93-1.57-3.5-3.5-3.5Zm.5,13.5c0,.276-.225,.5-.5,.5H5.5c-1.379,0-2.5-1.122-2.5-2.5V8.396c.763,.39,1.618,.604,2.5,.604h15c.275,0,.5,.224,.5,.5v10Zm-2-5c-.034,1.972-2.967,1.971-3,0,.034-1.972,2.967-1.971,3,0Z" />
            </svg>
            <p className="fixed left-12 float-right self-center font-bold text-lg ">Wallet</p>
        </div >
    )
}

export default Wallet