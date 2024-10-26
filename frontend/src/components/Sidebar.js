import React, { useState } from "react";
import { sidebardata } from "../data/sidebardata";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
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
<<<<<<< HEAD
            <div key={sidebar.id}>
              <button
                className={`group relative flex items-center p-4 py-3 w-full cursor-pointer rounded-xl focus:text-white focus:bg-gradient-to-r from-[#FE512E] to-[#F09619] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2 before:rounded-r-lg before:-ml-4 focus:before:bg-[#FE512E]`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === sidebar.id ? null : sidebar.id
                  )
                }
=======
            <React.Fragment key={sidebar.id}>
              <li
                className="relative flex items-center p-4 py-4 cursor-pointer rounded-xl hover:text-white hover:bg-gradient-to-r from-[#FE512E] to-[#F09619] before:absolute before:left-0 before:top-0 before:w-1 before:bottom-0  hover:before:bg-[#FE512E]"
                onClick={() => toggleDropdown(sidebar.id)}
>>>>>>> 1e19f2ae80b00d29dcf272936e4f6a768bee90ef
              >
                <span className="pr-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`group-focus:fill-white ${
                      activeDropdown === sidebar.id
                        ? "fill-white"
                        : "fill-[#4F4F4F]"
                    }`}
                    dangerouslySetInnerHTML={{ __html: sidebar.icon }}
                  />
                </span>
                <span className="font-semibold">{sidebar.title}</span>
              </button>
              {sidebar.dropdown && activeDropdown === sidebar.id && (
                <ul className="ml-8 space-y-2">
                  {sidebar.dropdown.map((dropdownItem) => (
                    <li
                      key={dropdownItem.id}
                      className="flex items-center py-2 pl-4 hover:bg-gray-50 cursor-pointer rounded"
                    >
                      <span className="font-semibold">
                        {dropdownItem.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t left-0 border-gray-200">
        <button className="w-full flex items-center text-[#E74C3C] justify-start px-4 py-2 rounded hover:bg-gradient-to-r from-[#D3D3D3] to-[#D3D3D3] ">
          <span className="mr-3 text-black">
            <img src="/assets/logout.svg" alt="logout" />
          </span>
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
