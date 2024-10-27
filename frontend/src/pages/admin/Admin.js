import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Dashboard from "./Dashboard";

const Admin = () => {
    return (
        <div className="flex bg-[#F0F5FB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <Dashboard />
            </div>
        </div>
    );
};

export default Admin

