import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className={'flex text-[20px] flex-col text-secondary-2'}>
            <div className="w-[70vw] mx-auto border-b-2 py-6 flex gap-[150px] [&>.section]:flex [&>.section]:flex-col [&>.section>.section-name]:text-black [&>.section>.section-name]:uppercase [&>.section>.section-name]:font-bold [&>.section>.section-name]:mb-2 [&>.section>.link]:py-1">
                <div>
                    <Link><img src={logo} /></Link>

                    <div className={'mt-6 flex flex-col gap-3'}>
                        <p className="max-w-[450px]">mply dummy txt of the pringint and typesting industry. Lorem Imsum has been</p>
                        <p>contact@email.com</p>
                        <p>+5 568989824</p>
                    </div>
                </div>

                <div className="section">
                    <h2 className={'section-name'}>About Us</h2>
                    <Link className={'link'}>{'Terms of Service'}</Link>
                    <Link className={'link'}>{'Privacy Policy'}</Link>
                    <Link className={'link'}>{'About Us'}</Link>
                </div>


                <div className="section">
                    <h2 className={'section-name'}>About Us</h2>
                    <Link className={'link'}>{'Quick Links'}</Link>
                    <Link className={'link'}>{'News'}</Link>
                    <Link className={'link'}>{'Customer Reviews'}</Link>
                    <Link className={'link'}>{'Affiliate Program'}</Link>
                </div>


                <div className="section">
                    <h2 className={'section-name'}>Account</h2>
                    <Link className={'link'}>{'Manage Account'}</Link>
                    <Link className={'link'}>{'Login'}</Link>
                    <Link className={'link'}>{'Register'}</Link>
                    <Link className={'link'}>{'My Exchanges'}</Link>
                    <Link className={'link'}>{'Profile'}</Link>
                </div>
            </div>
            <div className={'text-center py-8'}>
                2023 AFIWA, All rights reserved
            </div>
        </footer>
    )
}

export default Footer;