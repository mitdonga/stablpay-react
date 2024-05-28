import React from 'react'
import userSelector from '../store/selectors/userSelector'
import { useRecoilValue } from 'recoil'
import UserDashboard from '../components/UserDashboard'
import OfficerDashboard from '../components/OfficerDashboard'

export default function Home() {
	const currentUser = useRecoilValue(userSelector)

	return (
		<>
			{
				currentUser.role === "compliance_officer" ? 
				<OfficerDashboard user={currentUser} /> : 
				<UserDashboard user={currentUser} />
			}
		</>
	)
}
