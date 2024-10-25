import React, { useState } from "react";
import { sidebardata } from "../data/sidebardata";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="h-screen p-4 pt-0 reletive w-82 bg-white shadow-lg flex flex-col">
      <div className="px-4 pb-2 text-center">
        <h1 className="text-4xl font-bold p-4 text-[#FE512E] to-[#F09619]">
          Dash<span className="text-black">Stack</span>
        </h1>
      </div>
      <div className="flex-1">
        <ul className="space-y-2">
          {sidebardata.map((sidebar) => (
            <React.Fragment key={sidebar.id}>
              <li
                className="relative flex items-center p-4 py-4 cursor-pointer rounded-xl hover:text-white hover:bg-gradient-to-r from-[#FE512E] to-[#F09619] before:absolute before:left-0 before:top-0 before:w-1 before:bottom-0  hover:before:bg-[#FE512E]"
                onClick={() => toggleDropdown(sidebar.id)}
              >
           
                <span className="pr-3">
                  <img src={sidebar.icon} alt={`${sidebar.title} icon`} className="w-6 h-6" />
                </span>
                <span className="font-bold">{sidebar.title}</span>
              </li>

              {sidebar.dropdown && activeDropdown === sidebar.id && (
                <ul className="ml-8 space-y-2">
                  {sidebar.dropdown.map((dropdownItem) => (
                    <li
                      key={dropdownItem.id}
                      className="flex items-center py-2 pl-4 hover:bg-gray-50 cursor-pointer rounded"
                    >
                      <span className="font-medium">{dropdownItem.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t left-0 border-gray-200">
        <button className="w-full flex items-center text-[#E74C3C] justify-start px-4 py-2 rounded hover:bg-gradient-to-r from-[#D3D3D3] to-[#D3D3D3] ">
          <span className="mr-3 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-[#E74C3C]"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </span>
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
