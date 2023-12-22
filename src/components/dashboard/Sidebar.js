import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { useAxios } from "../../data/api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Roles } from "../../constants/Roles";
import { queryClient } from "../../libs/ReactQuery";

const Sidebar = () => {
    const { getCurrentUser } = useAxios()
    const [data, setData] = useState(null)
    // const { data } = useQuery('currentUser', getCurrentUser, { retry: 0, queryClient: queryClient })
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        loadUser();
    }, [setData])

    const loadUser = async () => {
        try {
            const fetchedData = await queryClient.fetchQuery('currentUser', getCurrentUser, { retry: 0 })
            setData(fetchedData)
        } catch (e) {
            console.log(e);
        }
    }

    const navs = [
        { admin: false, name: 'Dashboard', icon: { icon: 'material-symbols:dashboard-outline' }, path: '/dashboard' },
        { admin: false, name: 'Exchanges', icon: { icon: "pepicons-pencil:arrow-spin", rotate: 3 }, path: '/dashboard/exchanges' },
        { admin: false, name: 'New Exchange', icon: { icon: "fluent:add-12-filled", rotate: 3 }, path: '/new_exchange' },
        { admin: false, name: 'Reviews', icon: { icon: 'material-symbols:star-outline' }, path: '/reviews' },
        //{ admin:false, name: 'Referrals', icon: { icon: 'mdi:people-outline' }, path: '/dashboard/referrals' },
        { admin: true, name: 'All Exchanges', icon: { icon: 'pepicons-pencil:arrow-spin' }, path: '/dashboard/all_exchanges' },
        { admin: false, name: 'Profile', icon: { icon: 'codicon:account' }, path: '/dashboard/profile' },
    ]

    useEffect(() => {
        const user = data?.data
        if (user) {
            setIsAdmin(user.role.includes(Roles.USER))
        }
    }, [data])

    const settingOptions = [
        { name: 'Rates', icon: { icon: 'mdi:cog' }, path: '/dashboard/rates' },
        //{ name: 'Wallets', icon: { icon: 'codicon:account' }, path: '/dashboard/wallets' },
    ]
    return (
        <ul className={'flex flex-col gap-1 text-[20px] text-secondary-2'}>
            {navs.map(nav => ((isAdmin && nav.admin) || !nav.admin) && <li key={nav.name}><NavLink end to={nav.path} className={({ isActive, isPending }) => isActive ? 'text-accent bg-secondary-1 flex gap-3 items-center rounded-full px-4 py-3' : 'flex gap-3 rounded-full px-4 py-3 items-center'}> <Icon {...nav.icon} /> <span>{nav.name}</span></NavLink></li>)}

            {isAdmin && <li className="relative">
                <span id="dropdownDefaultButton" className={'disabled flex gap-3 rounded-full px-4 pt-3 items-center'}>
                    <Icon icon={'charm:cog'} /> <span>{'Settings'}</span>
                    <Icon icon={'ri:arrow-down-s-fill'} height={40} className="ml-auto align-start" />
                </span>

                <div className="divide-y divide-gray-100">
                    <ul className="text-[18px] pb-6 pl-20 pr-8 z-900" aria-labelledby="dropdownDefaultButton">
                        {settingOptions.map(nav => <li key={nav.name}><NavLink end to={nav.path} className={({ isActive, isPending }) => isActive ? 'text-accent bg-secondary-1 flex gap-3 items-center rounded-full px-4 py-2' : 'flex gap-3 rounded-full px-4 py-2 items-center'}> <span>{nav.name}</span></NavLink></li>)}
                    </ul>
                </div>

            </li>}
        </ul>



    )
}

export default Sidebar;
