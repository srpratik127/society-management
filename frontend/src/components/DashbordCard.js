import React from 'react'

const DashbordCard = ({ cards }) => {
    return (
        <div className="justify-center flex items-center gap-3 w-[25%]">

            <div className="bg-white rounded-lg shadow p-6 flex items-center w-full m-3 relative justify-between">
                <div className={`h-12 w-2 absolute left-0 top-1/2 transform -translate-y-1/2 rounded-tr-lg rounded-br-lg `} style={{ backgroundColor: cards.color }}></div>

                <div className="flex flex-col justify-center font-poppins px-3 text-left pl-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}> 
                    <p className="text-gray-500 text-sm  font-medium leading-6">
                        {cards.title}
                    </p>
                    <p className="text-black font-bold text-xl  leading-6">
                        ₹ {cards.amount}
                    </p>
                </div>

                <div className="flex justify-center items-center border rounded-lg" style={{ backgroundColor: cards.color, marginLeft: 'auto' }}>
                    <img src={cards.icon} alt="Icon" className="h-10 w-10 p-2" />
                </div>

            </div>

        </div>
    )
}

export default DashbordCard