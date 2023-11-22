import { Link } from "react-router-dom"
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from "react";
import { firebaseAuth } from "../../libs/Firebase";

const Login = () => {
    const [email, setEmail] = useState('brunoserkwi@gmail.com');
    const [password, setPassword] = useState('brunoserkwi@gmail.com');


    const signIn = async (e) => {
        e.preventDefault();
        try {
            const creds = await signInWithEmailAndPassword(firebaseAuth, email, password);
            console.log(creds);
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <div className={'flex justify-center pt-20 pb-32'}>
            <div className={'w-[400px]'}>
                <h1 className={'mb-10 text-[28px] font-bold'}>{'Login'}</h1>

                <form onSubmit={signIn} className={'flex flex-col gap-6 [&>.form-control]:flex [&>.form-control]:flex-col [&>.form-control>.input]:bg-red-transparent [&>.form-control>.input]:border-2 [&>.form-control>.input]:border-accent [&>.form-control>.input]:px-3 [&>.form-control>.input]:py-2 [&>.form-control>.input]:outline-none [&>.form-control>.input]:rounded-xl'}>
                    <div className={'form-control'}>
                        <label className={'label'}>{'Email Address'}</label>
                        <input className={'input'} type="email" />
                    </div>

                    <div className={'form-control'}>
                        <label className={'flex justify-between'}>
                            <span>{'Password'}</span>
                            <a className={'text-accent'} href='/'>{'Forgot password'}</a>
                        </label>
                        <div className={'input flex fled'}>
                            <input className={'flex-auto py-1'} type="password" />
                            <button>EYE</button>
                        </div>
                    </div>

                    <div className={'flex gap-2 items-center'}>
                        <input id={'accept-terms'} type="checkbox" />
                        <label htmlFor="accept-terms">{'I agree to the'} <Link>{'Terms & Privacy'}</Link></label>
                    </div>

                    <button className={'bg-accent text-white rounded-lg py-2 px-4'}>{'Login'}</button>
                </form>

                <p className={'mt-8 opacity-70'}>{'Don\'t have an account?'} <Link className={'text-accent'}>{'Create account'}</Link></p>
            </div>
        </div>
    )
}


export default Login;