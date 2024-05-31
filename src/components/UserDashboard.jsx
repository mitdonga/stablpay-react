import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import CompanyInfo from './CompanyInfo';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard({ user }) {
	const navigate = useNavigate()
	return (
		<>
			{user?.company &&
				<Box mt='10' mb='30' maxW="960px" mx="auto" boxShadow='2xl' rounded='md'>
					<CompanyInfo company={user.company} />
					
					{user.company.status === "rejected" && 
						<Box textAlign='center' my='10'>
							<Button mb='8' colorScheme='green' onClick={() => navigate("/edit-company")}>Resubmit</Button>
						</Box>
					}
				</Box>
			}
		</>
	)
}

