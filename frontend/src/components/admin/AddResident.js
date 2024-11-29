import React, { useState } from "react";
import AddOwnerTenant from "./AddOwnerTenant";
import { useLocation } from "react-router-dom";

function AddResident() {
  const location = useLocation();
  const resident = location.state?.resident;
  const [view, setView] = useState(resident?.role ? resident?.role : "owner");

  return (
    <>
      <div className="flex px-4 pt-4">
        <button
          className={`py-2 px-4 font-semibold border-b-4 border-orange-500 rounded-tl-lg rounded-tr-lg ${
            view === "owner" ? "text-white" : "text-black"
          }`}
          style={{
            background:
              view === "owner"
                ? "linear-gradient(to right, #FE512E, #F09619)"
                : "white",
          }}
          onClick={() => setView("owner")}
        >
          Owner
        </button>
        <button
          className={`py-2 px-4 font-semibold border-b-4 border-orange-500 rounded-tl-lg rounded-tr-lg ${
            view === "tenant" ? "text-white" : "text-black"
          }`}
          style={{
            background:
              view === "tenant"
                ? "linear-gradient(to right, #FE512E, #F09619)"
                : "white",
          }}
          onClick={() => setView("tenant")}
        >
          Tenant
        </button>
      </div>

      <div>
        <AddOwnerTenant role={view} editResident={resident} />
      </div>
    </>
  );
}

export default AddResident;
