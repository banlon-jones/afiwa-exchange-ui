'use client';

import { Link, NavLink } from "react-router-dom"
import logo from '../assets/logo.png'
import { useAuthenticated } from "../hooks/useAuthenticated"
import { Dropdown, Navbar } from 'flowbite-react';
import Sidebar from "./dashboard/Sidebar";
import { Icon } from "@iconify/react";

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
        /*{
            name: 'Reviews',
            path: '/reviews'
        },*/
        /*{
            name: 'News',
            path: '/news'
        }*/
    ]

    return (
        <Navbar fluid rounded className="text-xl relative z-40 bg-white drop-shadow-xl py-8 px-4 lg:px-[12.5rem]">
            
            <div className="flex md:order-2 relative">
                <Dropdown className="bg-white" label="Dropdown button" dismissOnClick={true} renderTrigger={() => <Icon className="lg:hidden" height={50} width={50} icon={'ion:menu'}/>}>
                    <Dropdown.Item>
                        <div className="z-40 bg-white min-w-[70vw]">
                            <Sidebar />
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </div>

            <Navbar.Brand href="/">
                <img src={logo} className="h-12" alt="AFIWA Exchange Logo" />
            </Navbar.Brand>

            <Navbar.Collapse className="lg:ml-auto">

                {isAuthenticated &&
                    <NavLink end className={(({ isActive }) => isActive ? 'border-b-black text-accent' : 'border-b-transparent') + ' py-2 text-xl'} to={'/dashboard'}>{'Dashboard'}</NavLink>
                }

                {
                    navs.map(nav => <NavLink key={`${nav.name}-${nav.path}`} end className={(({ isActive }) => isActive ? 'border-b-black text-accent' : 'border-b-transparent') + ' py-2 text-xl'} to={nav.path}>{nav.name}</NavLink>)
                }

                {
                    isAuthenticated ? <></>
                        : <div className={'md:ml-20 [&>*]:px-[30px] [&>*]:h-[55px] [&>*]:rounded-full flex flex-col md:flex-row gap-6 mt-4 md:mt-0 lg:gap-8'}>
                            <Link to={'login'} className={'text-accent border-2 border-accent flex items-center text-xl'}>{'Login'}</Link>
                            <Link to={'signup'} className={'bg-accent text-white flex items-center text-xl'}>{'Create Account'}</Link>
                        </div>
                }
              {isAuthenticated &&
                <div className={'md:ml-20 [&>*]:px-[30px] [&>*]:h-[55px] [&>*]:rounded-full flex flex-col md:flex-row gap-6 mt-4 md:mt-0 lg:gap-8'}>
                  <Link to={'signup'} className={'bg-accent text-white flex items-center text-xl'}>{'Logout'}</Link>
                </div>
              }
            </Navbar.Collapse>

        </Navbar>
    )
}
export default NavBar;
