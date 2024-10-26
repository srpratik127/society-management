import React from 'react'
import DashbordCard from '../DashbordCard'
import { DashbordCards } from '../../data/admindashbord'
import LineChart from "../../components/admin/LineChart";
import ImportantNum from './ImportantNum';

const Dashboard = () => {
    return (
        <div className='p-4'>
            <div className='flex'>
                {DashbordCards.map((cards) => (
                    <DashbordCard cards={cards} />
                ))}

            </div>
            <div className='flex'>
                <div className="w-2/4 bg-white p-3 rounded-lg shadow">
                    <LineChart />
                </div>
                <div className="shadow mx-3 bg-white rounded-lg w-[24%]">
                    <ImportantNum />
                </div>
            </div>
        </div>
    )
}

export default Dashboard