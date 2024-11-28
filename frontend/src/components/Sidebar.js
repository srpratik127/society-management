import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { removeMenu, ToggleMenu } from "../store/ToggleMenuSlice";
import {
  sidebarAdminData,
  sidebarResidentData,
  sidebarSecurityData,
} from "../utils/sidebardata";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const isOpenMenu = useSelector((store) => store.menu.openMenu);
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    if (user?.user_role === "admin") {
      setSidebarData(sidebarAdminData);
    } else if (user?.user_role === "resident") {
      setSidebarData(sidebarResidentData);
    } else if (user?.user_role === "security") {
      setSidebarData(sidebarSecurityData);
    }
  }, []);

  const handleButtonClick = (sidebar) => {
    setActiveDropdown(activeDropdown === sidebar.id ? null : sidebar.id);
    if (!sidebar.dropdown) {
      navigate(sidebar.link);
      dispatch(removeMenu());
    }
  };

  return (
    <div
      className={`h-screen p-4 pt-0 w-82 bg-white shadow-lg flex flex-col xl:relative absolute transition-all duration-300 ease-in-out z-20 xl:translate-x-0 ${
        isOpenMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <img
        src="/assets/toggle-menu.png"
        alt=""
        className="absolute right-[-50px] top-[20px] block xl:hidden hover:shadow-lg rounded-full cursor-pointer"
        onClick={() => dispatch(ToggleMenu())}
      />
      <div className="px-4 pb-2 text-center">
        <h1 className="text-4xl font-bold p-4 text-[#FE512E] to-[#F09619] select-none cursor-pointer">
          Dash<span className="text-black">Stack</span>
        </h1>
      </div>
      <div className="flex-1">
        <ul className="space-y-2">
          {sidebarData.map((sidebar) => {
            const isActive =
              location.pathname.endsWith(sidebar.link) ||
              (sidebar.dropdown &&
                sidebar.dropdown.some((dropdownItem) =>
                  location.pathname.includes(dropdownItem.link)
                ));
            return (
              <div key={sidebar.id}>
                <button
                  className={`group relative flex items-center justify-between p-4 py-3 w-full cursor-pointer rounded-xl before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2 before:rounded-r-lg before:-ml-4 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#FE512E] to-[#F09619] before:bg-[#FE512E]"
                      : ""
                  }`}
                  onClick={() => handleButtonClick(sidebar)}
                >
                  <div className="flex items-center">
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
                    <span className="font-normal text-nowrap">
                      {sidebar.title}
                    </span>
                  </div>

                  {sidebar.dropdown && (
                    <img
                      src="/assets/dropdown-arrow-down.svg"
                      className=""
                      alt=""
                    />
                  )}
                </button>

                {sidebar.dropdown && activeDropdown === sidebar.id && (
                  <ul className="ml-6 mt-2">
                    {sidebar.dropdown.map((dropdownItem) => {
                      const isDropdownActive = location.pathname.includes(
                        dropdownItem.link
                      );
                      return (
                        <li
                          key={dropdownItem.id}
                          className={`flex items-center py-1 pl-4 cursor-pointer border-l-4 hover:bg-gray-50 ${
                            isDropdownActive
                              ? "border-black text-black"
                              : "text-[#4F4F4F]"
                          }`}
                          onClick={() => {
                            navigate(dropdownItem.link);
                            dispatch(removeMenu());
                          }}
                        >
                          <span className="font-normal">
                            {dropdownItem.title}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      <div className="p-4 pb-0 border-t left-0 border-gray-200">
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
