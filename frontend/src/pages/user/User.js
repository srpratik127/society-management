import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeMenu } from "../../store/ToggleMenuSlice";

const User = () => {
  const dispatch = useDispatch();
  const isOpenMenu = useSelector((store) => store.menu.openMenu);
  return (
    <div className="flex bg-[#F0F5FB] h-screen overflow-y-hidden">
      <Sidebar />
      <div
        className="flex-1 flex flex-col"
        onClick={() => isOpenMenu === true && dispatch(removeMenu())}
      >
        <Navbar />
        <div className="main flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default User;
