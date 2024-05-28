import React from 'react'
import userSelector from '../store/selectors/userSelector'
import { useRecoilValue } from 'recoil'

export default function Home() {
	const currentUser = useRecoilValue(userSelector)

	return (
		<div>
			Welcome {currentUser.email}
		</div>
	)
}
