import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const navs = [
        {name:'Dashboard', icon: {icon: 'material-symbols:dashboard-outline'}, path: ''},
        {name:'Exchanges', icon: {icon:"pepicons-pencil:arrow-spin", rotate:3}, path: '/dashboard/exchanges'},
        {name:'Reviews', icon: {icon: 'material-symbols:star-outline'}, path: '/reviews'},
        {name:'Referrals', icon: {icon: 'mdi:people-outline'}, path: '/dashboard/referrals'},
        {name:'Profile', icon: {icon: 'codicon:account'}, path: '/dashboard/profile'},
    ]
    return (
        <ul className={'flex flex-col gap-1 text-[20px] text-secondary-2'}>
            {navs.map(nav => <li key={nav.name}><NavLink end to={nav.path} className={({isActive, isPending}) => isActive ? 'text-accent bg-secondary-1 flex gap-3 items-center rounded-full px-4 py-3' : 'flex gap-3 rounded-full px-4 py-3 items-center'}> <Icon {...nav.icon}/> <span>{nav.name}</span></NavLink></li>)}
        </ul>
    )
}

export default Sidebar;