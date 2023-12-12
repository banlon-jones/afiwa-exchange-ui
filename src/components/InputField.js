export const InputField = ({formProps , label, children, name='', placeholder = '', type = 'text' }) => {

    return (
        <div className="w-full">
            <label htmlFor="email-address-icon" className="block mb-2 font-medium text-gray-900">{label}</label>
            <div className="relative">
                <input {...formProps} name={name} type={type} id="email-address-icon" className="border border-gray-300 text-gray-900 text-sm rounded-lg outline-accent focus:ring-accent focus:border-accent block w-full pe-10 p-2.5" placeholder={placeholder}/>
                <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
                   {children}
                </div>
            </div>
        </div>
    )
}