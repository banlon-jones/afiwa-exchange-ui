import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const navs = [
        { name: 'Dashboard', icon: { icon: 'material-symbols:dashboard-outline' }, path: '' },
        { name: 'Exchanges', icon: { icon: "pepicons-pencil:arrow-spin", rotate: 3 }, path: '/dashboard/exchanges' },
        { name: 'Reviews', icon: { icon: 'material-symbols:star-outline' }, path: '/reviews' },
        { name: 'Referrals', icon: { icon: 'mdi:people-outline' }, path: '/dashboard/referrals' },
        { name: 'Profile', icon: { icon: 'codicon:account' }, path: '/dashboard/profile' },
    ]

    const settingOptions = [
        { name: 'Rates', icon: { icon: 'mdi:cog' }, path: '/dashboard/rates' },
        { name: 'Wallets', icon: { icon: 'codicon:account' }, path: '/dashboard/wallets' },
    ]
    return (
        <ul className={'flex flex-col gap-1 text-[20px] text-secondary-2'}>
            {navs.map(nav => <li key={nav.name}><NavLink end to={nav.path} className={({ isActive, isPending }) => isActive ? 'text-accent bg-secondary-1 flex gap-3 items-center rounded-full px-4 py-3' : 'flex gap-3 rounded-full px-4 py-3 items-center'}> <Icon {...nav.icon} /> <span>{nav.name}</span></NavLink></li>)}

            <li className="relative">
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className={'flex gap-3 rounded-full px-4 pt-3 items-center'}>
                    <Icon icon={'charm:cog'} /> <span>{'Settings'}</span>
                    <Icon icon={'ri:arrow-down-s-fill'} height={40} className="ml-auto align-start" />
                </button>

                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
                    <ul className="text-[18px] pb-6 pl-20 pr-8" aria-labelledby="dropdownDefaultButton">
                        {settingOptions.map(nav => <li key={nav.name}><NavLink end to={nav.path} className={({ isActive, isPending }) => isActive ? 'text-accent bg-secondary-1 flex gap-3 items-center rounded-full px-4 py-2' : 'flex gap-3 rounded-full px-4 py-2 items-center'}> <span>{nav.name}</span></NavLink></li>)}
                    </ul>
                </div>
            </li>



            {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex" type="button">
                Dropdown button
            </button> */}



        </ul>
    )
}

export default Sidebar;