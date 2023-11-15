import { Link, NavLink } from "react-router-dom"
import logo from '../../assets/logo.png'

const NavBar = () => {
    const navs = ['Exchange', 'Rates', 'Reviews', 'News']
    return (
        <header className={'text-xl bg-secondary-1 h-[6.25rem] flex items-center px-[12.5rem]'}>
            <Link to={'/'}>
                <img src={logo} />
            </Link>

            <nav className={'text-secondary-2 ml-auto h-full flex [&>*]:w-[5.9rem] [&>*]:text-center [&>*]:h-full [&>*]:flex [&>*]:items-center [&>*]:border-b-4 [&>*]:justify-center'}>
                {navs.map(nav => <NavLink className={({isActive}) => isActive ? 'border-b-black': 'border-b-transparent'} key={nav} to={nav}>{nav}</NavLink>)}
            </nav>


            <div className={'ml-auto [&>*]:px-[1.875rem] [&>*]:h-[2.5rem] [&>*]:rounded-full flex gap-8'}>
                <Link to={'login'} className={'text-accent border-2 border-accent flex items-center'}>{'Login'}</Link>
                <Link to={'signup'} className={'bg-accent text-white flex items-center'}>{'Create Account'}</Link>
            </div>

        </header>
    )
}

export default NavBar;