import React from 'react'
import DashbordCard from '../../components/DashbordCard'
import { DashbordCards } from '../../data/admindashbord'
import LineChart from "../../components/admin/LineChart";
import ImportantNum from '../../components/admin/ImportantNum';
import PendingMaintenances from '../../components/admin/PendingMaintenances';
import ComplainTable from '../../components/admin/ComplainTable';
import UpcomingActivitys from '../../components/admin/UpcomingActivitys';

const Dashboard = () => {
    return (
        <div className=' '>
            <div className='flex'>
                {DashbordCards.map((cards) => (
                    <DashbordCard cards={cards} />
                ))}
            </div>
            
            <div className='flex'>
                <div className="w-2/4 bg-white p-3 rounded-lg shadow">
                    <LineChart />
                </div>
                <div className="shadow mx-3 bg-white rounded-lg w-[25%]">
                    <ImportantNum />
                </div>
                <div className="shadow mx-3 bg-white rounded-lg w-[25%]">
                    <PendingMaintenances />
                </div>
            </div>  

           <div className='flex'>
           <ComplainTable/>
           <UpcomingActivitys/>
           </div>

        </div>
    )
}

export default Dashboard