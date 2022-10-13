function Add({ active }) {
	if (active) {
		return (
			<div className="w-6 h-6 grid relative self-center
                overflow-hidden transform duration-300 rounded-xl fill-violet-800 dark:fill-violet-400">
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021">
					<g>
						<path
							d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"
						/>
					</g>
				</svg>

			</div>
		)
	}
	return (
		<div className="w-6 h-6 grid relative self-center
            overflow-hidden transform duration-300 
            fill-slate-800 dark:fill-slate-200 hover:fill-violet-800 dark:hover:fill-violet-400">
			<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 512 512">
				<g>
					<path d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
					<path d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z" />
					<path d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z" />
				</g>
			</svg>
		</div>
	)
}

export default Add