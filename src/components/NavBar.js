import { Link, NavLink } from "react-router-dom"
import logo from '../assets/logo.png'
import { useAuthenticated } from "../hooks/useAuthenticated"

const NavBar = () => {
    const isAuthenticated = useAuthenticated();

    const navs = [
        {
            name: 'Exchange',
            path: '/new_exchange'
        },
        {
            name: 'Rates',
            path: '/rates'
        },
        {
            name: 'Reviews',
            path: '/reviews'
        },
        /*{
            name: 'News',
            path: '/news'
        }*/
    ]

    return (


        <nav className={'text-xl bg-white drop-shadow-xl min-h-[6.25rem] flex items-center lg:px-[12.5rem]'}>
            <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Afiwa Logo" />
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden ml-auto w-full md:flex md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {isAuthenticated &&
                            <li className="[&>*]:py-2 [&>*]:block">
                                <NavLink end className={({ isActive }) => isActive ? 'border-b-black text-accent' : 'border-b-transparent'} to={'/dashboard'}>{'Dashboard'}</NavLink>
                            </li>
                        }
                        {
                            navs.map(nav => <li key={`${nav.name}-${nav.path}`} className="[&>*]:py-2 [&>*]:block">
                                <NavLink end className={({ isActive }) => isActive ? 'border-b-black text-accent' : 'border-b-transparent'} to={nav.path}>{nav.name}</NavLink>
                            </li>)
                        }
                    </ul>

                    {
                        isAuthenticated ? <></>
                            : <div className={'md:ml-20 [&>*]:px-[30px] [&>*]:h-[55px] [&>*]:rounded-full flex flex-col md:flex-row gap-4 lg:gap-8'}>
                                <Link to={'login'} className={'text-accent border-2 border-accent flex items-center'}>{'Login'}</Link>
                                <Link to={'signup'} className={'bg-accent text-white flex items-center'}>{'Create Account'}</Link>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
