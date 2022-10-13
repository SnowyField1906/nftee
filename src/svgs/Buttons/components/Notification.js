function Notification({ active }) {
    if (active) {
        return (
            <div className="w-12 h-12 grid relative self-center
                transform duration-300 rounded-2xl
                bg-gradient-to-r from-blue-300 dark:from-blue-700 to-violet-300 dark:to-violet-700">
                <svg className="w-8 h-8 ml-2 absolute self-center fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.068,18H19.724a3,3,0,0,0,2.821-4.021L19.693,6.094A8.323,8.323,0,0,0,11.675,0h0A8.321,8.321,0,0,0,3.552,6.516l-2.35,7.6A3,3,0,0,0,4.068,18Z" />
                    <path d="M7.1,20a5,5,0,0,0,9.8,0Z" />
                </svg>
            </div>
        )
    }
    return (
        <div className="w-12 h-12 grid relative self-center
            overflow-hidden transform duration-300
            fill-slate-800 dark:fill-slate-200 hover:fill-violet-800 dark:hover:fill-violet-200">
            <svg className="w-8 h-8 ml-1 absolute self-center"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M23.608,17.013l-2.8-10.1A9.443,9.443,0,0,0,2.486,7.4L.321,17.14a2.5,2.5,0,0,0,2.441,3.042H6.905a5.285,5.285,0,0,0,10.154,0H21.2a2.5,2.5,0,0,0,2.409-3.169Zm-20.223.169,2.03-9.137a6.443,6.443,0,0,1,12.5-.326l2.628,9.463Z" />
            </svg>
        </div >
    )
}

export default Notification