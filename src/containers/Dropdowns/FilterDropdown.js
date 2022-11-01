import { useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DatePicker from 'react-date-picker'

function FilterDropdown({ index, filterType, rawFilter, setRawFilter, render, setRender, dateInput }) {
    const [start, setStart] = useState(rawFilter[index][0])
    const [end, setEnd] = useState(rawFilter[index][1])

    useEffect(() => {
        let newRawFilter = rawFilter
        if (dateInput) {
            newRawFilter[index] = [start ? new Date(start).getTime() * 1000 : '', end ? new Date(end).getTime() * 1000 : '']
        }
        else {
            newRawFilter[index] = [start, end]
        }
        setRawFilter(newRawFilter)
        setRender(render + 1)
        console.log('render', render)
    }, [start, end, rawFilter])

    const isActive = () => {
        return rawFilter[index][0] || rawFilter[index][1]
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="relative inline-block text-left">
                <Menu>
                    {({ open }) => (
                        <>
                            <span className="rounded-md shadow-sm">
                                <Menu.Button className={`${isActive() ? "text-black dark:text-white" : "text-black/50 dark:text-white/50"} inline-flex justify-center w-[10rem] h-12 px-4 py-2 pt-3 text-sm font-semibold leading-5 transition duration-150 ease-in-out button-medium rounded-md focus:outline-none focus:shadow-outline-blue border`}>
                                    {isActive() && dateInput &&
                                        <div className='grid -translate-y-2'>
                                            <p className='text-sm'>{start ? start.toLocaleDateString('fr-BE') : "Begin"}</p>
                                            <p className='text-sm'>{end ? end.toLocaleDateString('fr-BE') : "End"}</p>
                                        </div>
                                    }
                                    {isActive() && !dateInput &&
                                        <p className='text-sm'>{(start ?? "Begin") + " - " + (end ?? "End")}</p>
                                    }
                                    {!isActive() && <p className='text-sm'>{Object.keys(filterType)[index]}</p>}
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
                                    className="absolute right-0 w-[10rem] mt-2 origin-top-right button-medium-no-hover divide-black/50 dark:divide-white/50 rounded-md shadow-lg outline-none"
                                >
                                    <div className="py-1">
                                        <Menu.Item>
                                            <button
                                                onClick={() => { setStart(''); setEnd('') }}
                                                className={`${!isActive()
                                                    ? 'bg-black/50 text-white text-semibold'
                                                    : 'text-black/50 dark:text-white/50'
                                                    } hover:bg-black/50 hover:text-white flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                All
                                            </button>
                                        </Menu.Item>
                                    </div>

                                </Menu.Items>

                                <Menu.Items
                                    static
                                    className="absolute right-0 w-[10rem] mt-2 origin-top-right button-medium-no-hover divide-black/50 dark:divide-white/50 rounded-md shadow-lg outline-none"
                                >
                                    <div className="py-1">
                                        <Menu.Item>
                                            <button
                                                onClick={() => { setStart(''); setEnd('') }}
                                                className={`${!isActive()
                                                    ? 'bg-black/50 text-white text-semibold'
                                                    : 'text-black/50 dark:text-white/50'
                                                    } hover:bg-black/50 hover:text-white flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                All
                                            </button>
                                        </Menu.Item>
                                    </div>
                                    {dateInput ?
                                        <div className="py-1">
                                            <div className={`${rawFilter[index][0]
                                                ? 'bg-black/50 text-white text-semibold'
                                                : 'text-black/50 dark:text-white/50'
                                                } hover:bg-black/50 hover:text-white flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                                <DatePicker onChange={setStart} value={start ? start : null} format="dd/MM/y" locale='en-US'
                                                    className="w-full relative flex h-10 px-4 py-2 pt-3 text-sm font-semibold leading-5 transition duration-150 ease-in-out button-medium rounded-md focus:outline-none focus:shadow-outline-blue border" clearIcon={null} calendarIcon={null}
                                                    calendarClassName="w-full backdrop-lg border-0 text-black dark:text-white " />
                                            </div>
                                            <div className={`${rawFilter[index][1]
                                                ? 'bg-black/50 text-white text-semibold'
                                                : 'text-black/50 dark:text-white/50'
                                                } hover:bg-black/50 hover:text-white flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                                <DatePicker onChange={setEnd} value={end ? end : null} format="dd/MM/y" locale='en-US'
                                                    className="w-full relative flex h-10 px-4 py-2 pt-3 text-sm font-semibold leading-5 transition duration-150 ease-in-out button-medium rounded-md focus:outline-none focus:shadow-outline-blue border" clearIcon={null} calendarIcon={null}
                                                    calendarClassName="w-full backdrop-lg border-0 text-black dark:text-white " />
                                            </div>
                                        </div>
                                        :
                                        <div className="py-1">
                                            <div className={`${rawFilter[index][0]
                                                ? 'bg-black/50 text-white text-semibold'
                                                : 'text-black/50 dark:text-white/50'
                                                } hover:bg-black/50 hover:text-white flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                                <input type="number" placeholder='Start' onChange={(e) => setStart(e.target.value)} defaultValue={start}
                                                    className="w-full h-10 px-4 py-2 pt-3 text-sm font-semibold leading-5 transition duration-150 ease-in-out button-medium rounded-md focus:outline-none focus:shadow-outline-blue border" />
                                            </div>

                                            <div className={`${rawFilter[index][1]
                                                ? 'bg-black/50 text-white text-semibold'
                                                : 'text-black/50 dark:text-white/50'
                                                } hover:bg-black/50 hover:text-white flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                <input type="number" placeholder='End' onChange={(e) => setEnd(e.target.value)} defaultValue={end}
                                                    className="w-full h-10 px-4 py-2 pt-3 text-sm font-semibold leading-5 transition duration-150 ease-in-out button-medium rounded-md focus:outline-none focus:shadow-outline-blue border" />
                                            </div>
                                        </div>
                                    }
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div >
    )
}

export default FilterDropdown
