import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeMenu } from "../../store/ToggleMenuSlice";

const Admin = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex bg-[#F0F5FB] h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col" onClick={() => dispatch(removeMenu())}>
        <Navbar />
        <div className="flex-1 overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;