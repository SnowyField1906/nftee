function Notification({ active }) {
    if (active) {
        return (
            <div className="w-[2.75rem] h-[2.75rem] grid relative self-center
                transform duration-300 rounded-2xl
                bg-gradient-to-r from-blue-300 dark:from-blue-700 to-violet-300 dark:to-violet-700">
                <svg className="w-8 h-8 place-self-center justify-center self-center fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.068,18H19.724a3,3,0,0,0,2.821-4.021L19.693,6.094A8.323,8.323,0,0,0,11.675,0h0A8.321,8.321,0,0,0,3.552,6.516l-2.35,7.6A3,3,0,0,0,4.068,18Z" />
                    <path d="M7.1,20a5,5,0,0,0,9.8,0Z" />
                </svg>
            </div>
        )
    }
    return (
        <div className="w-[2.75rem] h-[2.75rem] grid relative self-center
            overflow-hidden transform duration-300
            fill-slate-800 dark:fill-slate-200 hover:fill-violet-800 dark:hover:fill-violet-200">
            <svg className="w-8 h-8 place-self-center justify-center self-center"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z" />
            </svg>
        </div >
    )
}

export default Notification