import React, { useState } from 'react';
import AddOwner from './AddOwner';
import AddTenant from './AddTenant';

function AddResident() {
    const [view, setView] = useState("Owner");

    return (
        <>
            <div className="flex px-8 pt-8">
                <button
                    className={`py-2 px-4 font-bold border-b-4 border-orange-500 rounded-tl-lg rounded-tr-lg ${view === "Owner" ? "text-white" : "text-black"}`}
                    style={{
                        background: view === "Owner" ? "linear-gradient(to right, #FE512E, #F09619)" : "transparent",
                    }}
                    onClick={() => setView("Owner")}
                >
                    Owner
                </button>
                <button
                    className={`py-2 px-4 font-bold border-b-4 border-orange-500 rounded-tl-lg rounded-tr-lg ${view === "Tenant" ? "text-white" : "text-black"}`}
                    style={{
                        background: view === "Tenant" ? "linear-gradient(to right, #FE512E, #F09619)" : "transparent",
                    }}
                    onClick={() => setView("Tenant")}
                >
                    Tenant
                </button>
            </div>

            <div>
                {view === "Owner" && <AddOwner />}
                {view === "Tenant" && <AddTenant />}
            </div>
        </>
    );
}

export default AddResident;
