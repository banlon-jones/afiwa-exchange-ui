import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom"

import {firebaseAuth} from '../../libs/Firebase'

const SignUp = () => {

    const signUp = async (e) => {
        e.preventDefault();

        try {
            const resp = await createUserWithEmailAndPassword(firebaseAuth, 'brunoserkwi@gmail.com', 'brunoserkwi@gmail.com');
            console.log(resp);
        } catch (e) {
            console.error(e);
        }

    }

    return (
        <div className={'flex justify-center pt-20 pb-32'}>
            <form onSubmit={signUp} className={'w-[400px]'}>
                <h1 className={'mb-10 text-[28px] font-bold'}>{'Create Account'}</h1>

                <div className={'flex flex-col gap-6 [&>.form-control]:flex [&>.form-control]:flex-col [&>.form-control>.input]:bg-red-transparent [&>.form-control>.input]:border-2 [&>.form-control>.input]:border-accent [&>.form-control>.input]:px-3 [&>.form-control>.input]:py-2 [&>.form-control>.input]:outline-none [&>.form-control>.input]:rounded-xl'}>
                    <div className={'form-control'}>
                        <label className={'label'}>{'Email Address'}</label>
                        <input className={'input'} type="email" />
                    </div>

                    <div className={'form-control'}>
                        <label className={'flex justify-between'}>
                            <span>{'Password'}</span>
                        </label>
                        <div className={'input flex fled'}>
                            <input className={'flex-auto py-1'} type="password" />
                            <button>EYE</button>
                        </div>
                    </div>


                    <div className={'form-control'}>
                        <label className={'flex justify-between'}>
                            <span>{'Confirm Password'}</span>
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


                    <button className={'bg-accent text-white rounded-lg py-2 px-4'}>{'Register'}</button>
                </div>

                <p className={'mt-8 opacity-70'}>{'Have an account?'} <Link to={'/login'} className={'text-accent'}>{'Sign in'}</Link></p>
            </form>
        </div>
    )
}


export default SignUp;