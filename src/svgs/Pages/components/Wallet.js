function Wallet({ active }) {
    if (active) {
        return (
            <div className="w-full h-[2.75rem] grid relative self-center
                transform duration-300 rounded-2xl
                bg-gradient-to-r from-blue-300 dark:from-blue-700 to-violet-300 dark:to-violet-700">
                <svg className="w-8 h-8 ml-2 absolute self-center fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21,6H5c-.859,0-1.672-.372-2.235-.999,.55-.614,1.349-1.001,2.235-1.001H23c1.308-.006,1.307-1.995,0-2H5C2.239,2,0,4.239,0,7v10c0,2.761,2.239,5,5,5H21c1.657,0,3-1.343,3-3V9c0-1.657-1.343-3-3-3Zm-1,9c-1.308-.006-1.308-1.994,0-2,1.308,.006,1.308,1.994,0,2Z" />
                </svg>
                <p className="fixed left-[52px] float-right self-center font-semibold text-lg text-white">Wallet</p>
            </div>
        )
    }
    return (
        <div className="w-[2.75rem] hover:w-full h-[2.75rem] grid relative self-center
            overflow-hidden transform duration-300 border-2
            rounded-2xl border-slate-800 dark:border-slate-200 hover:border-violet-800 dark:hover:border-violet-200
            text-slate-800 dark:text-state-200 hover:text-violet-800 dark:hover:text-violet-200
            fill-slate-800 dark:fill-slate-200 hover:fill-violet-800 dark:hover:fill-violet-200">
            <svg className="w-8 h-8 ml-1 absolute self-center"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"></svg>
                <path d="M21,6H5c-.859,0-1.672-.372-2.235-.999,.55-.614,1.349-1.001,2.235-1.001H23c.553,0,1-.448,1-1s-.447-1-1-1H5C2.239,2,0,4.239,0,7v10c0,2.761,2.239,5,5,5H21c1.657,0,3-1.343,3-3V9c0-1.657-1.343-3-3-3Zm1,13c0,.551-.448,1-1,1H5c-1.654,0-3-1.346-3-3V6.998c.854,.639,1.904,1.002,3,1.002H21c.552,0,1,.449,1,1v10Zm-2-5c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z" />
            </svg>
            <p className="fixed left-12 float-right self-center font-semibold text-lg ">Wallet</p>
        </div >
    )
}

export default Wallet