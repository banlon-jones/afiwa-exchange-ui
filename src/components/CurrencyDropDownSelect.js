import { useEffect, useState } from "react"

export const CurrencyDropDownSelect = ({ data, current, defaultValueLabel, label, name, value, editable = true }) => {
    const [selectedValue, setSelectedValue]= useState();
    useEffect(()=> {
        setSelectedValue(data.find(p => p.id === current.key));
    }, [current, setSelectedValue, data])

    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-2">
                <h3 className="font-bold">{label}</h3>
                <div className="flex flex-col gap-6">
                    <div className="relative border rounded-2xl flex items-center px-3 py-1 overflow-hidden">
                        {
                            selectedValue?.id ? <img alt={selectedValue.name} src={selectedValue.logo} className="w-[41px] h-[30px] rounded-xl"/>
                            : <div className="w-[41px] h-[30px] rounded-xl bg-orange-500"></div>
                        }
                        <select {...name} id="sourceCurrency" className="bg-transparent outline-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value={null}>{defaultValueLabel}</option>
                            {
                                data.map((entry) => <option key={`${label}-${entry.id}`} value={entry.id}> {entry.name} </option>)
                            }
                        </select>

                        <div className="w-[51px] h-full bg-secondary-1 absolute right-0 -z-10">
                        </div>
                    </div>

                    <div className="border rounded-2xl py-2 px-4">
                        <input disabled={!editable} value={(editable || (!editable && !selectedValue?.id))? undefined : (current?.value * current?.rate / (selectedValue?.rate || 1))} {...value} type="number" className="outline-none w-full text-[35px] font-bold" />

                        <p className="opacity-60 pt-1 text-[16px] min-h-[12px]">
                            {selectedValue?.id ? (selectedValue?.name) ? `1 ${selectedValue?.name} = ${selectedValue?.rate} USD` : '': 'No currency chosen'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}