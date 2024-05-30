import React from 'react'
import { Box } from '@chakra-ui/react'
import CompanyInfo from './CompanyInfo';

export default function UserDashboard({ user }) {
	return (
		<>
			{user?.company &&
			<Box my={20} maxW="960px" mx="auto" boxShadow='2xl' rounded='md'>
				<CompanyInfo company={user.company} />
			</Box>}
		</>
	)
}

