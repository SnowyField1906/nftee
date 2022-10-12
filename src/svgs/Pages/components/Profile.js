function Profile({ active }) {
    if (active) {
        return (
            <div className="w-full h-12 grid relative self-center
                transform duration-300 rounded-2xl
                bg-gradient-to-r from-blue-400 dark:from-blue-700 to-violet-400 dark:to-violet-700">
                <svg className="w-8 h-8 ml-2 absolute self-center fill-white" viewBox="0 0 24 24" xmlns="http:;//www.w3.org/2000/svg">
                    <path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z" />
                    <circle cx="12" cy="6" r="6" />
                </svg>
                <p className="fixed left-[52px] float-right self-center font-bold text-lg text-white">Profile</p>
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
                <g id="_01_align_center" data-name="01 align center">
                    <path d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z" />
                    <path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z" />
                </g>
            </svg>
            <p className="fixed left-12 float-right self-center font-bold text-lg ">Profile</p>
        </div >
    )
}

export default Profile