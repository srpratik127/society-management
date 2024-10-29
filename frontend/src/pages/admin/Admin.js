import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Dashboard from "../../pages/admin/Dashboard";
import Profile from "./Profile";
import Recident from "./Recident";
import IncomeTable from "./IncomeTable";

const Admin = () => {
    return (
        <div className="flex bg-[#F0F5FB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                {/* <Dashboard />*/}
                {/* <Profile/> */}
                {/* <Recident/> */}
                <IncomeTable/>
            </div>

        </div>
    );
};

export default Admin

