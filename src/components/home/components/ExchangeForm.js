import { Icon } from "@iconify/react"
import { useState } from "react";
import { CurrencyDropDownSelect } from "../../CurrencyDropDownSelect";
import { useForm } from "react-hook-form";
import { InputField } from "../../InputField";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { SelectAuth } from "../../login/AuthSlice";
import { useSelector } from "react-redux";
import { useAxios } from "../../../data/api";


export const ExchangeForm = ({ currencies }) => {
    const {initiateTransactionRequest} = useAxios()
    const navigate = useNavigate();
    const auth = useSelector(SelectAuth);

    const initiateTransactionMutation = useMutation((transaction) => {
        return initiateTransactionRequest(transaction);
    })
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [data, setData] = useState({});
    const [sourceCurrency, setSourceCurrency] = useState({});

    const onValueChanged = (e) => {
        const control = {};
        control[e.target.name] = e.target.value;
        if (e.target.name === 'fromCurrency') {
            setSourceCurrency(currencies.find(currency => currency.id === e.target.value));
        }

        setData({ ...data, ...control });
    }

    const makeExchange = (data) => {
        const { fromCurrency, toCurrency, fromValue, toValue, ...walletInfo } = data;
        const formData = {
            from: fromCurrency,
            to: toCurrency,
            amount: parseFloat(fromValue),
            ...walletInfo
        }

        if(!auth.accessToken) {
            // cache the transaction details
            navigate('/login')
        } else {
            initiateTransactionMutation.mutate(formData, {
                onSuccess: (response) => {
                    navigate('/dashboard/exchanges')
                }
            })
        }

       
    }

    return (
        <div>
            <form onSubmit={handleSubmit(makeExchange)} className={'flex items-center flex-col gap-8 border-2 rounded-3xl px-[60px] py-[50px] w-full'}>
                <CurrencyDropDownSelect
                    name={register('fromCurrency', { required: true, onChange: onValueChanged })}
                    value={register('fromValue', { required: true, onChange: onValueChanged })}
                    label={'Send'} data={currencies}
                    current={{ key: data?.fromCurrency, value: data?.fromValue }}
                    defaultValueLabel={'Choose a Currency'}
                />

                <Icon height={24} className="opacity-60" icon="fontisto:arrow-down-l" />

                <CurrencyDropDownSelect
                    name={register('toCurrency', { required: true, onChange: onValueChanged })}
                    value={register('toValue', { required: true, onChange: onValueChanged })}
                    label={'Receive'} data={currencies}
                    current={{ key: data?.toCurrency, value: data?.fromValue, rate: sourceCurrency?.rate }}
                    editable={false}
                    defaultValueLabel={'Choose a Currency'}
                />

                <InputField formProps={register('email', { required: false })} name="email" label={'Your Email Address'} />
                <InputField formProps={register('walletAddress', { required: true })} name="walletAddress" label={"Recepient's Wallet Address"} />
                <InputField formProps={register('walletName', { required: true })} name="walletName" label={"Recepient's Wallet Name"} />

                <button className="w-full py-[20px] px-[30px] bg-accent text-white font-bold drop-shadow rounded-full text-[20px]">
                    Exchange
                </button>
            </form>
        </div>
    )
}
