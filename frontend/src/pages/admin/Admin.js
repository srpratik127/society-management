import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
        </div>
      </div>
    </div>
  );
};

export default Admin;
