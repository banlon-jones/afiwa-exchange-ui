import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react";
import { firebaseAuth } from "../../libs/Firebase";
import { useDispatch } from "react-redux";
import { login } from "./AuthSlice";
import { Icon } from "@iconify/react";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [terms, setTerms] = useState(false);


    const signIn = async (e) => {
        e.preventDefault();

        // validate inputs

        try {
            const creds = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const auth = {
                email: creds.user.email,
                accessToken: creds.user.accessToken,
                phoneNumber: creds.user.phoneNumber,
                expiresAt: new Date().getTime() + creds._tokenResponse.expiresIn,
                refreshToken: creds._tokenResponse.refreshToken
            }

            dispatch(login(auth))
            localStorage.setItem('user', JSON.stringify(auth))

            navigate('/dashboard')
        } catch (e) {
            console.log(e);
        }
    }

    const togglePasswordIndicator = () => {
        setPasswordFieldType(passwordFieldType === 'password' ? 'text' : 'password')
    }


    return (
        <div className={'flex justify-center pt-20 flex items-center pb-32 min-h-[85vh]'}>
            <div className={'w-[400px]'}>
                <h1 className={'mb-10 text-[28px] font-bold'}>{'Login'}</h1>

                <form onSubmit={signIn} className={'flex flex-col gap-6 [&>.form-control]:flex [&>.form-control]:flex-col [&>.form-control>.input]:bg-red-transparent [&>.form-control>.input]:border-2 [&>.form-control>.input]:border-accent [&>.form-control>.input]:px-3 [&>.form-control>.input]:py-2 [&>.form-control>.input]:outline-none [&>.form-control>.input]:rounded-xl'}>
                    <div className={'form-control'}>
                        <label className={'label'}>{'Email Address'}</label>
                        <input onChange={event => setEmail(event.target.value)} className={'input'} type="email" />
                    </div>

                    <div className={'form-control'}>
                        <label className={'flex justify-between'}>
                            <span>{'Password'}</span>
                            <a className={'text-accent'} href='/'>{'Forgot password'}</a>
                        </label>
                        <div className={'input flex fled'}>
                            <input onChange={event => setPassword(event.target.value)} className={'flex-auto py-1 outline-none bg-transparent'} type={passwordFieldType} />
                            <button className={'px-2 text-2xl'} type="button" onClick={togglePasswordIndicator}>
                                <Icon icon={passwordFieldType === 'password'? 'mdi:eye' : 'mdi:eye-off'} />
                            </button>
                        </div>
                    </div>

                    <div className={'flex gap-2 items-center'}>
                        <input value={terms} onChange={event => setTerms(event.target.value)} id={'accept-terms'} type="checkbox" />
                        <label htmlFor="accept-terms">{'I agree to the'} <Link>{'Terms & Privacy'}</Link></label>
                    </div>

                    <button disabled={!terms} type="submit" className={'bg-accent disabled:opacity-60 text-white rounded-lg py-2 px-4'}>{'Login'}</button>
                </form>

                <p className={'mt-8 opacity-70'}>{'Don\'t have an account?'} <Link to={'/signup'} className={'text-accent'}>{'Create account'}</Link></p>
            </div>
        </div>
    )
}


export default Login;