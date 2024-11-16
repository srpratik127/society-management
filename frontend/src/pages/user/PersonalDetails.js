import React from 'react'
import UserData from '../../components/user/UserData'
import MembersData from '../../components/user/MemberData'
import VehicleData from '../../components/user/VehicleData'
import MaintenanceData from '../../components/user/MaintananceData'
import AnnouncementData from '../../components/user/AnnouncementData'

const PersonalDetails = () => {
  return (
    <div>
     <UserData/>
     <MembersData/>
     <VehicleData/>
     <MaintenanceData/>
     <AnnouncementData/>
    </div>
  )
}

export default PersonalDetails
