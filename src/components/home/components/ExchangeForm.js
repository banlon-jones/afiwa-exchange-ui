import { Icon } from "@iconify/react"

export const ExchangeForm = () => {
    return (
        <div>
            <form className={'flex items-center flex-col gap-8 border-2 rounded-3xl px-[60px] py-[50px] w-full'}>
                <div className="w-full flex flex-col gap-2">
                    <h3 className="font-bold">Send</h3>
                    <div className="flex flex-col gap-6">
                        <div className="relative border rounded-2xl flex items-center px-3 py-1 overflow-hidden">
                            <div className="w-[51px] h-[30px] rounded-xl bg-secondary-1"></div>
                            <select id="sourceCurrency" className="bg-transparent outline-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>

                            <div className="w-[51px] h-full bg-secondary-1 absolute right-0 -z-10">

                            </div>
                        </div>

                        <div className="border rounded-2xl py-2 px-4">
                            <input type="number" className="outline-none w-full text-[35px] font-bold" />

                            <p className="opacity-60 pt-1 text-[16px]">
                                1 USD = 590 FCFA
                            </p>
                        </div>
                    </div>
                </div>

                <Icon height={24} className="opacity-60" icon="fontisto:arrow-down-l" />

                <div className="w-full flex flex-col gap-2">
                    <h3 className="font-bold">Receive</h3>
                    <div className="flex flex-col gap-6">
                        <div className="relative border rounded-2xl flex items-center px-3 py-1 overflow-hidden">
                            <div className="w-[51px] h-[30px] rounded-xl bg-orange-500"></div>
                            <select id="sourceCurrency" className="bg-transparent outline-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>

                            <div className="w-[51px] h-full bg-secondary-1 absolute right-0 -z-10">

                            </div>
                        </div>

                        <div className="border rounded-2xl py-2 px-4">
                            <input type="number" className="outline-none w-full text-[35px] font-bold" />

                            <p className="opacity-60 pt-1 text-[16px]">
                                1 USD = 590 FCFA
                            </p>
                        </div>
                    </div>
                </div>


                <button className="w-full py-[20px] px-[30px] bg-accent text-white font-bold drop-shadow rounded-full text-[20px]">
                    Exchange
                </button>
            </form>
        </div>
    )
}