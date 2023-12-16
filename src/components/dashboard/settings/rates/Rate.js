import { Icon } from "@iconify/react";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../../../spinner/Spinner";
import { useMutation } from "react-query";
import { useAxios } from "../../../../data/api";

export const Rate = ({ rate, adding = false, removeTemoporary }) => {
    const { editRate, addRate } = useAxios();
    const [editing, setEditing] = useState(adding)
    const { register, handleSubmit } = useForm();
    const { mutate: editMutation, isLoading: isEditing } = useMutation(({ id, ...rateData }) => {
        console.log(id, rateData);

        return editRate(rateData, id)
    })
    const { mutate: addMutation, isLoading: isAdding } = useMutation((rateData) => {
        return addRate(rateData)
    })

    const submit = (formData) => {
        isAdding ? addMutation(formData) : editMutation(formData)
    }
    
    const handleCancelEdit = () => {
        setEditing(false);
        adding && removeTemoporary(rate)
    }

    return (
        <>
            <tr className={(editing ? 'border-2 ' : '') + ' [&>*]:py-3'} key={rate.id}>
                <td>
                    <div className={'flex gap-3 items-start px-2'}>
                        {
                            !adding &&
                            <fieldset hidden>
                                <input name="id" {...register('id', { value: rate.id, required: true })} />
                            </fieldset>
                        }
                        {rate.logo &&
                            <img className={'w-[30px] h-[30px]'} src={rate.logo} alt={rate.name} />
                        }

                        <div className="flex-1 flex flex-col gap-1">
                            <fieldset disabled={!editing} className="w-full">
                                <input placeholder="Logo URL" className={'w-full py-1 px-2 outline-accent disabled:bg-transparent '} name="logo" {...register('logo', { value: rate.logo, required: true })} />
                            </fieldset>
                            <fieldset disabled={!editing}>
                                <input placeholder="Name" className={'py-1 px-2 disabled:bg-transparent '} name="name" {...register('name', { value: rate.name, required: true })} />
                            </fieldset>
                        </div>
                    </div>
                </td>
                <td>
                    <fieldset disabled={!editing}>
                        <input placeholder="Wallet address" className={'py-1 px-2 disabled:bg-transparent'} name="wallet" {...register('wallet', { value: rate.wallet, required: true })} />
                    </fieldset>
                </td>
                <td>
                    <fieldset disabled={!editing}>
                        <input placeholder="Rate" type="number" className={'py-1 px-2 disabled:bg-transparent'} name="rate" {...register('rate', { value: rate.rate, required: true })} />
                    </fieldset>
                </td>
                <td>
                    <div className="px-2">
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