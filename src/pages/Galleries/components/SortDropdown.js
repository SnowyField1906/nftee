import { Menu, Transition } from '@headlessui/react'

function SortDropdown(props) {
    const isActive = () => {
        return props.array.includes(props.sort)
    }
    return (
        <div className="flex items-center justify-center p-12">
            <div className="relative inline-block text-left">
                <Menu>
                    {({ open }) => (
                        <>
                            <span className="rounded-md shadow-sm">
                                <Menu.Button className={`${isActive() ? "text-indigo-700" : "text-gray-700"} inline-flex justify-center w-[11rem] h-12 px-4 py-2 pt-3 text-md font-semibold leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 focus:shadow-outline-blue`}>
                                    <span>{isActive() ? props.sort : props.name}</span>
                                    <svg
                                        className="w-5 h-5 ml-2 -mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Menu.Button>
                            </span>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute right-0 w-[11rem] mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                >
                                    <div className="py-1">
                                        {
                                            props.array.map((item, index) => (
                                                <Menu.Item key={index}>
                                                    <button
                                                        onClick={() => props.setSort(item)}
                                                        className={`${item === props.sort
                                                            ? 'bg-indigo-100 text-indigo-600 text-semibold'
                                                            : 'text-gray-700'
                                                            } hover:bg-indigo-100 hover:text-indigo-600 group flex rounded-md items-center w-full px-2 py-2 text-md`}
                                                    >
                                                        {item}
                                                    </button>
                                                </Menu.Item>
                                            ))
                                        }
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    )
}

export default SortDropdown
