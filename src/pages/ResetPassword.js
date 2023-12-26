import { Link } from "react-router-dom"
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from "react";
import { firebaseAuth } from "../libs/Firebase";
import { Spinner } from "../components/spinner/Spinner";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { InputField } from "../components/InputField";
import { useForm } from "react-hook-form";
import { Alert } from "flowbite-react";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const schema = Yup.object().shape({
        email: Yup.string()
            .required('An email is required')
            .email('Invalid email'),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const signIn = async (data) => {
        if (!sent) {
            try {
                setLoading(true)
                await sendPasswordResetEmail(firebaseAuth, data.email);
                setSent(true);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }
    }


    return (
        <div className={'flex justify-center pt-20 flex items-center pb-32 min-h-[85vh] px-4'}>
            <div className={'md:w-[400px]'}>

                <div className="mb-8 text-center">
                    <h1 className={'text-[20px] md:text-[28px] font-bold'}>{'Forgot your password?'}</h1>
                    <p className="opacity-50">{'No worries! We will send you reset instructions'}</p>
                </div>

                {
                    sent && <div className="mb-5">
                        <Alert color="info" className="text-center">
                            <span className="font-bold md:text-lg">{'Instructions sent!'}</span>
                            {' Check your email box for instructions on resetting your password'}
                        </Alert>
                    </div>
                }

                <form onSubmit={handleSubmit(signIn)} className={'flex flex-col gap-5 [&>.form-control]:flex [&>.form-control]:flex-col [&>.form-control>.input]:bg-red-transparent [&>.form-control>.input]:border-2 [&>.form-control>.input]:border-accent [&>.form-control>.input]:px-3 [&>.form-control>.input]:py-2 [&>.form-control>.input]:outline-none [&>.form-control>.input]:rounded-xl'}>
                    <InputField placeholder={'Enter your email address'} errors={errors.email?.message} formProps={register('email')} name="email" label='Email Address' />

                    <button disabled={loading || sent} type="submit" className={'bg-accent disabled:opacity-60 flex items-center justify-center gap-4 text-white rounded-lg py-2 px-5'}>
                        <span>{'Reset Password'}</span>
                        {loading && <Spinner />}
                    </button>
                </form>

                <p className={'mt-8 text-center'}><Link to={'/login'} className={'text-accent'}>{'Go back to Login'}</Link></p>
            </div>
        </div>
    )
}


export default ResetPassword;