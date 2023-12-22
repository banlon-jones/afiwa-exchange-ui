import { ValidationError } from "./ValidationError"

export const InputField = ({formProps, errors , label, children, name='', placeholder = '', type = 'text', clazz = ' '}) => {
    return (
        <div className="w-full">
            <label htmlFor="email-address-icon" className="block mb-2 font-medium text-gray-900">{label}</label>
            <div className="relative">
                <input {...formProps} name={name} type={type} id="email-address-icon" className={(errors ? 'border-red-400 text-red-500 ' : 'border-gray-300  ') + ' border text-gray-900 text-sm rounded-lg outline-accent focus:ring-accent focus:border-accent block w-full pe-10 p-2.5 ' + clazz} placeholder={placeholder}/>
                <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
                   {children}
                </div>
            </div>
            <ValidationError>{errors}</ValidationError>
        </div>
    )
}