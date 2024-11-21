import React from "react";
import MaintenanceData from "../../components/user/MaintananceData";

const MaintenanceInvoices = () => {
  return (
    <div className="space-y-6">
      <MaintenanceData isViewInvoice={true} />
    </div>
  );
};

export default MaintenanceInvoices;
