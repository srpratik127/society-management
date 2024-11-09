import React, { useState } from "react";
import { sidebardata } from "../data/sidebardata";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ToggleMenu } from "../store/ToggleMenuSlice";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const isOpenMenu = useSelector((store) => store.menu.openMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (sidebar) => {
    setActiveDropdown(activeDropdown === sidebar.id ? null : sidebar.id);
    if (!sidebar.dropdown) navigate(sidebar.link);
  };

  return (
    <div className={`h-screen p-4 pt-0 w-82 bg-white shadow-lg flex flex-col xl:relative absolute z-30 xl:${isOpenMenu ? "right-[100%]":""}`}>
      <img src="/assets/toggle-menu.png" alt="" className="absolute right-[-50px] top-[20px] block xl:hidden cursor-pointer" onClick={()=> dispatch(ToggleMenu())}/>
      <div className="px-4 pb-2 text-center">
        <h1 className="text-4xl font-bold p-4 text-[#FE512E] to-[#F09619]">
          Dash<span className="text-black">Stack</span>
        </h1>
      </div>
      <div className="flex-1">
        <ul className="space-y-2">
          {sidebardata.map((sidebar) => {
            const isActive =
              location.pathname.endsWith(sidebar.link) ||
              (sidebar.dropdown &&
                sidebar.dropdown.some((dropdownItem) =>
                  location.pathname.includes(dropdownItem.link)
                ));

            return (
              <div key={sidebar.id}>
                <button
                  className={`group relative flex items-center p-4 py-3 w-full cursor-pointer rounded-xl before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2 before:rounded-r-lg before:-ml-4 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#FE512E] to-[#F09619] before:bg-[#FE512E]"
                      : ""
                  }`}
                  onClick={() => handleButtonClick(sidebar)}
                >
                  <span className="pr-3">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      xmlns="http://www.w3.org/2000/svg"
                      className={` ${
                        isActive ? "fill-white" : "fill-[#4F4F4F]"
                      }`}
                      dangerouslySetInnerHTML={{ __html: sidebar.icon }}
                    />
                  </span>
                  <span className="font-normal">{sidebar.title}</span>
                </button>
                {sidebar.dropdown && activeDropdown === sidebar.id && (
                  <ul className="ml-8 space-y-2">
                    {sidebar.dropdown.map((dropdownItem) => (
                      <li
                        key={dropdownItem.id}
                        className="flex items-center py-2 pl-4 hover:bg-gray-50 cursor-pointer rounded"
                        onClick={() => navigate(dropdownItem.link)}
                      >
                        <span className="font-normal">
                          {dropdownItem.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      <div className="p-4 border-t left-0 border-gray-200">
        <button
          className="w-full flex items-center text-[#E74C3C] justify-start px-4 py-2 rounded hover:bg-slate-100"
          onClick={() => {
            dispatch(removeToken());
          }}
        >
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
