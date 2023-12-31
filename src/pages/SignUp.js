import { Link, useNavigate } from "react-router-dom"

import { useMutation } from "react-query";
import { InputField } from "../components/InputField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAxios } from "../data/api";
import { Spinner } from "../components/spinner/Spinner";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

const SignUp = () => {
    const navigate = useNavigate();
    const { signUpRequest } = useAxios();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const schema = Yup.object().shape({
        email: Yup.string()
            .required('An email is required')
            .email('Invalid email'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9\s.-]+$/, 'Invalid phone number')
            .required('A phone number is required'),
        displayName: Yup.string()
            .required('A display name is required')
            .min(3, 'Display name must have atleast 3 characters'),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password length should be at least 8 characters")
            .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Password must be atleast 8 characters, containing a number, special symbol, uppercase letter and lower case letter'),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords do not match")
    });
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const { mutate, isLoading } = useMutation((credentials) => {
        return signUpRequest(credentials)
    })

    const onInputChange = (e) => {
        setAcceptTerms(e.target.checked)
    }

    const signUp = async (data) => {
        try {
            mutate(data, {
                onSuccess: () => {
                    navigate('/login');
                }
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={'flex justify-center pt-20 pb-32 flex items-center min-h-[80vh]'}>
            <form onSubmit={handleSubmit(signUp)} className={'w-[80vw] md:w-[400px]'}>
                <h1 className={'mb-8 text-[28px] font-bold'}>{'Create Account'}</h1>

                <div className="flex flex-col gap-3">
                    <InputField errors={errors.email?.message} formProps={register('email')} name="email" label='Email Address' />
                    <InputField errors={errors.phoneNumber?.message} formProps={register('phoneNumber')} name="phoneNumber" label='Phone Number' />
                    <InputField errors={errors.displayName?.message} formProps={register('displayName')} name="displayName" label={'Display Name'} />
                    <InputField errors={errors.password?.message} formProps={register('password')} name="password" type="password" label={'Password'} />
                    <InputField errors={errors.confirmPassword?.message} formProps={register('confirmPassword')} type={showPassword ? 'text' : 'password'} name="confirmPassword" label={'Confirm Password'}>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex">
                            {
                                showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z" /></svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><g fill="currentColor"><path d="M10 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10ZM14 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z" clipRule="evenodd" /></g></svg>
                            }
                        </button>
                    </InputField>


                    <div className={'flex gap-2 items-center'}>
                        <input {...register('acceptTerms', { required: { value: true, message: 'Please accept terms of service to continue' }, onChange: onInputChange })} id={'accept-terms'} type="checkbox" />
                        <label htmlFor="accept-terms">{'I agree to the'} <Link>{'Terms & Privacy'}</Link></label>
                    </div>

                    <button disabled={isLoading || !acceptTerms} type="submit" className={'bg-accent disabled:opacity-60 flex items-center justify-center gap-4 text-white rounded-lg py-2 px-4'}>
                        <span>{'Register'}</span>
                        {isLoading && <Spinner />}
                    </button>
                </div>

                <p className={'mt-8 opacity-70'}>{'Have an account?'} <Link to={'/login'} className={'text-accent'}>{'Sign in'}</Link></p>
            </form>
        </div>
    )
}


export default SignUp;
