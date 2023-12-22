import { Icon } from "@iconify/react";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../../../spinner/Spinner";
import { useMutation } from "react-query";
import { useAxios } from "../../../../data/api";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { InputField } from "../../../InputField";

export const Rate = ({ rate, adding = false, removeTemoporary }) => {
    const { editRate, addRate } = useAxios();
    const [editing, setEditing] = useState(adding)


    const schema = Yup.object().shape({
        id: Yup.string()
            .required('ID is required'),
        logo: Yup.string()
            .url('Invalid Url')
            .required('Logo is required'),
        name: Yup.string()
            .required('A name is required'),
        wallet: Yup.string()
            .required("Wallet address is required"),
        rate: Yup.number()
            .moreThan(0, 'Rate cannot be less than or equal to 0')
            .required("Rate is required")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const { mutate: editMutation, isLoading: isEditing } = useMutation(({ id, ...rateData }) => {
        return editRate(rateData, id)
    })
    const { mutate: addMutation, isLoading: isAdding } = useMutation((rateData) => {
        return addRate(rateData)
    })

    const submit = (formData) => {
        adding ? addMutation(formData) : editMutation(formData)
    }

    const handleCancelEdit = () => {
        setEditing(false);
        adding && removeTemoporary(rate)
    }

    return (
        <>
            <tr className={(editing ? 'border-2 ' : '') + ' [&>*]:py-4'} key={rate.id}>
                <td className="align-top">
                    <div className={'flex gap-3 items-start px-2'}>
                        {
                            !adding &&
                            <fieldset hidden>
                                <input name="id" {...register('id', { value: rate.id})} />
                            </fieldset>
                        }
                        {rate.logo &&
                            <img className={'w-[30px] h-[30px]'} src={rate.logo} alt={rate.name} />
                        }

                        <div className="flex-1 flex flex-col gap-1">
                            <fieldset disabled={!editing} className="w-full">
                                <InputField clazz={(editing ? 'border': 'border-none py-0 ')+' disabled:bg-transparent'} errors={errors.logo?.message} placeholder="Logo URL" name="logo" formProps={register('logo', { value: rate.logo })} />
                            </fieldset>
                            <fieldset disabled={!editing}>
                                <InputField clazz={(editing ? 'border': 'border-none py-0')+' disabled:bg-transparent'} errors={errors.name?.message} placeholder="Name" name="name" formProps={register('name', { value: rate.name })} />
                            </fieldset>
                        </div>
                    </div>
                </td>
                <td className="align-top">
                    <fieldset disabled={!editing}>
                        <InputField clazz={(editing ? 'border': 'border-none py-0')+' disabled:bg-transparent'} placeholder="Wallet address" errors={errors.wallet?.message} name="wallet" formProps={register('wallet', { value: rate.wallet })} />
                    </fieldset>
                </td>
                <td className="align-top">
                    <fieldset disabled={!editing}>
                        <InputField clazz={(editing ? 'border': 'border-none py-0')+' disabled:bg-transparent'} placeholder="Rate" errors={errors.wallet?.message} type="number" name="rate" formProps={register('rate', { value: rate.rate })} />
                    </fieldset>
                </td>
                <td className="align-top">
                    <div className="px-2 pt-2">
                        {
                            !editing &&
                            <button onClick={() => setEditing(true)} type="button" className="bg-secondary-1 py-2 px-4 rounded-xl"><Icon height={24} icon={'mdi:edit-outline'} /></button>

                        }
                        {
                            editing &&
                            <div className="flex gap-2">
                                <button onClick={handleCancelEdit} type="reset" className="px-7 opacity-70 hover:opacity-100 py-2 bg-secondary-2 text-white  text-lg rounded-xl">{'Cancel'}</button>
                                <button onClick={handleSubmit(submit)} className="px-7 py-2 bg-accent opacity-70 hover:opacity-100 text-white text-lg rounded-xl flex items-center gap-2" type="submit">
                                    <span>{'Save'}</span>
                                    {(isEditing || isAdding) && <Spinner />}
                                </button>
                            </div>
                        }
                    </div>
                </td>
            </tr>
        </>
    )
}
