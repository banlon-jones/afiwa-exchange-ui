import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react";
import { firebaseAuth } from "../libs/Firebase";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/AuthSlice";
import { Icon } from "@iconify/react";
import { Spinner } from "../components/spinner/Spinner";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { InputField } from "../components/InputField";
import { useForm } from "react-hook-form";

const Login = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const [terms, setTerms] = useState(false);

    const schema = Yup.object().shape({
        email: Yup.string()
            .required('An email is required')
            .email('Invalid email'),
        password: Yup.string()
            .required("Password is required")
    });
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const signIn = async (data) => {
        try {
            setLoading(true)
            const creds = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
            const auth = {
                email: creds.user.email,
                accessToken: creds.user.accessToken,
                phoneNumber: creds.user.phoneNumber,
                expiresAt: new Date().getTime() + creds._tokenResponse.expiresIn,
                refreshToken: creds._tokenResponse.refreshToken
            }

            dispatch(login(auth))

            const redirectUrl = searchParams.get('redirectTo');
            navigate(redirectUrl || '/dashboard')
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    const togglePasswordIndicator = () => {
        setPasswordFieldType(passwordFieldType === 'password' ? 'text' : 'password')
    }


    return (
        <div className={'flex justify-center pt-20 flex items-center pb-32 min-h-[85vh]'}>
            <div className={'md:w-[400px]'}>
                <h1 className={'mb-10 text-[28px] font-bold'}>{'Login'}</h1>

                <form onSubmit={handleSubmit(signIn)} className={'flex flex-col gap-6 [&>.form-control]:flex [&>.form-control]:flex-col [&>.form-control>.input]:bg-red-transparent [&>.form-control>.input]:border-2 [&>.form-control>.input]:border-accent [&>.form-control>.input]:px-3 [&>.form-control>.input]:py-2 [&>.form-control>.input]:outline-none [&>.form-control>.input]:rounded-xl'}>
                    <InputField errors={errors.email?.message} formProps={register('email')} name="email" label='Email Address' />

                    <InputField errors={errors.password?.message} formProps={register('password')} type={passwordFieldType} name="password" label='Password'>
                        <button className={'text-2xl'} type="button" onClick={togglePasswordIndicator}>
                            <Icon icon={passwordFieldType === 'password' ? 'mdi:eye' : 'mdi:eye-off'} />
                        </button>
                    </InputField>

                    <div className={'flex gap-2 items-center'}>
                        <input value={terms} onChange={event => setTerms(event.target.value)} id={'accept-terms'} type="checkbox" />
                        <label htmlFor="accept-terms">{'I agree to the'} <Link>{'Terms & Privacy'}</Link></label>
                    </div>

                    <button disabled={!terms || loading} type="submit" className={'bg-accent disabled:opacity-60 flex items-center justify-center gap-4 text-white rounded-lg py-2 px-4'}>
                        <span>{'Login'}</span>
                        {loading && <Spinner />}
                    </button>
                </form>

                <p className={'mt-8 opacity-70'}>{'Don\'t have an account?'} <Link to={'/signup'} className={'text-accent'}>{'Create account'}</Link></p>
            </div>
        </div>
    )
}


export default Login;