function Create({ active }) {
	if (active) {
		return (
			<div className="w-full h-12 grid relative self-center
                transform duration-300 rounded-2xl
                bg-gradient-to-r from-blue-400 dark:from-blue-700 to-violet-400 dark:to-violet-700">
				<svg className="w-8 h-8 ml-2 absolute self-center fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm5 13h-4v4h-2v-4h-4v-2h4v-4h2v4h4z" />
				</svg>
				<p className="fixed left-[52px] float-right self-center font-bold text-lg text-white">Create</p>
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
				<path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm1-11h4v2h-4v4h-2v-4h-4v-2h4v-4h2z" />
			</svg>
			<p className="fixed left-12 float-right self-center font-bold text-lg ">Create</p>
		</div >
	)
}

export default Create