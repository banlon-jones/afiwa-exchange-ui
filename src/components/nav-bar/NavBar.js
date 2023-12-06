import { Link, NavLink } from "react-router-dom"
import logo from '../../assets/logo.png'
import { useAuthenticated } from "../../hooks/useAuthenticated"

const NavBar = () => {
    const isAuthenticated = useAuthenticated();

    const navs = [
        {
            name: 'Exchange',
            path: '/dashboard/exchanges'
        },
        {
            name: 'Rates',
            path: '/rates'
        },
        {
            name: 'Reviews', 
            path: '/reviews'
        },
        {
            name: 'News', 
            path: '/news'
        }
    ]
    return (
        <header className={'text-xl bg-white drop-shadow-xl h-[6.25rem] flex items-center px-[12.5rem]'}>
            <Link to={'/'}>
                <img alt="Afiwa logo" src={logo} />
            </Link>

            <nav className={'text-secondary-2 ml-auto h-full flex [&>*]:w-[5.9rem] [&>*]:text-center [&>*]:h-full [&>*]:flex [&>*]:items-center [&>*]:border-b-4 [&>*]:justify-center'}>
                {navs.map(nav => <NavLink end className={({ isActive }) => isActive ? 'border-b-black text-accent' : 'border-b-transparent'} key={`nav-${nav.name}`} to={nav.path}>{nav.name}</NavLink>)}
            </nav>


            {
                isAuthenticated ? <></>
                    : <div className={'ml-auto [&>*]:px-[30px] [&>*]:h-[55px] [&>*]:rounded-full flex gap-8'}>
                        <Link to={'login'} className={'text-accent border-2 border-accent flex items-center'}>{'Login'}</Link>
                        <Link to={'signup'} className={'bg-accent text-white flex items-center'}>{'Create Account'}</Link>
                    </div>
            }

        </header>
    )
}

export default NavBar;