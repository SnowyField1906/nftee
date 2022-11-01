function Logs({ active }) {
    if (active) {
        return (
            <div className="w-full h-[2.75rem] grid relative self-center
                transform duration-300 rounded-2xl
                bg-gradient-to-r from-blue-300 dark:from-blue-700 to-violet-300 dark:to-violet-700">
                <svg className="w-8 h-8 ml-2 absolute self-center fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17,0H7C4.243,0,2,2.243,2,5v14c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-7,19c0,.552-.448,1-1,1h-2c-.552,0-1-.448-1-1v-2c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1v2Zm0-6c0,.552-.448,1-1,1h-2c-.552,0-1-.448-1-1v-2c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1v2Zm0-6c0,.552-.448,1-1,1h-2c-.552,0-1-.448-1-1v-2c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1v2Zm7,12h-4c-1.308-.006-1.307-1.994,0-2h4c1.308,.006,1.307,1.994,0,2Zm0-6h-4c-1.308-.006-1.307-1.994,0-2h4c1.308,.006,1.307,1.994,0,2Zm0-6h-4c-1.308-.006-1.307-1.994,0-2h4c1.308,.006,1.307,1.994,0,2Z" />
                </svg>
                <p className="fixed left-[52px] float-right self-center font-semibold text-lg text-white">Logs</p>
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
                <path d="M17,24H7c-2.757,0-5-2.243-5-5V5C2,2.243,4.243,0,7,0h10c2.757,0,5,2.243,5,5v14c0,2.757-2.243,5-5,5ZM7,2c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h10c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3H7Zm11,4c0-.552-.448-1-1-1h-4c-.552,0-1,.448-1,1s.448,1,1,1h4c.552,0,1-.448,1-1Zm0,6c0-.552-.448-1-1-1h-4c-.552,0-1,.448-1,1s.448,1,1,1h4c.552,0,1-.448,1-1Zm0,6c0-.552-.448-1-1-1h-4c-.552,0-1,.448-1,1s.448,1,1,1h4c.552,0,1-.448,1-1ZM10,7v-2c0-.552-.448-1-1-1h-2c-.552,0-1,.448-1,1v2c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1Zm0,6v-2c0-.552-.448-1-1-1h-2c-.552,0-1,.448-1,1v2c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1Zm0,6v-2c0-.552-.448-1-1-1h-2c-.552,0-1,.448-1,1v2c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1Z" />
            </svg>
            <p className="fixed left-12 float-right self-center font-semibold text-lg ">Logs</p>
        </div >
    )
}

export default Logs