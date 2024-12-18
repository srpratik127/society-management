import React from "react";

const DashbordCard = ({ cards }) => {
  return (
    <div className="bg-[white] rounded-lg shadow relative z-[1]">
      <div className="bg-white  sm:flex items-center w-full justify-between p-6 rounded-lg">
        <div
          className={`h-12 w-2 absolute left-0 top-1/2 transform -translate-y-1/2 rounded-tr-lg rounded-br-lg`}
          style={{ backgroundColor: cards.color }}
        ></div>
        <div
          className="flex flex-col justify-center font-poppins px-3 text-left pl-2"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <p className="font-medium leading-6">
            {cards.title}
          </p>
          <p className="text-black font-bold text-xl leading-6">
            {cards.amount}
          </p>
        </div>
        <div
          className="flex justify-center w-12 items-center border rounded-lg sm:ml-auto"
          style={{ backgroundColor: cards.color}}
        >
          <img src={cards.icon} alt="Icon" className="h-10 w-10 p-2" />
        </div>
        <div
          className={`absolute w-[100%] h-[100%] rounded-e-lg rounded-tl-lg top-[-2px] right-[-2px] z-[-1]`}
          style={{ background: `linear-gradient(45deg, #ffff 70%, ${cards.color})` }}
        ></div>
      </div>
    </div>
  );
};

export default DashbordCard;
