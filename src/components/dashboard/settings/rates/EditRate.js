import { Icon } from "@iconify/react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const EditRate = ({rate}) => {
    const [editing, setEditing] = useState(false)
    const {register, handleSubmit} = useForm()

    const saveRate = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(saveRate)} className="flex gap-4 items-center">
            <input type="number" {...register('rate', {required: true, value: rate})} disabled={!editing} className="border border-3 rounded-xl px-4 py-2 text-right w-[150px] outline-accent" />

            {!editing &&
                <button onClick={() => setEditing(true)} type="button" className="bg-secondary-1 py-2 px-4 rounded-xl"><Icon height={24} icon={'mdi:edit-outline'} /></button>
            }

            {
                editing &&
                <div className="flex items-center gap-4">
                    <button onClick={()=>setEditing(false)} type="reset" className="px-7 opacity-70 hover:opacity-100 py-2 bg-secondary-2 text-white  text-lg rounded-xl">{'Cancel'}</button>
                    <button className="px-7 py-2 bg-accent opacity-70 hover:opacity-100 text-white text-lg rounded-xl" type="submit">{'Save'}</button>
                </div>
            }
        </form>
    )
}