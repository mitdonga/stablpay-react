import React from 'react'
import { Card, CardHeader, CardBody, Stack, Box, Text, StackDivider, Heading, Badge, Flex, Spacer } from '@chakra-ui/react'

export default function UserDashboard({user}) {
	return (
		<>
			{user?.company &&
			<Box my={20} maxW="960px" mx="auto" boxShadow='2xl' rounded='md'>
				<Card>
					<CardHeader>
						<Flex>
							<Heading size='md'>Company Info</Heading>
							<Spacer />
							<Badge my='2' fontSize='1.5em' colorScheme='green'>
								Approved
							</Badge>
						</Flex>
					</CardHeader>

					<CardBody>
						<Stack divider={<StackDivider />} spacing='4'>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Legal Name
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.legal_name}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Email
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.email}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Address
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.address}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Phone Number
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.phone_number}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Director Name
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.director_name}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Director Designation
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.director_designation}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Director Info
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.director_info}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									PAN Number
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.pan_number}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Primary Contact Person
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.primary_contact_person}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Primary Contact Info
								</Heading>
								<Text pt='2' fontSize='sm'>
									{user.company.primary_contact_info}
								</Text>
							</Box>
						</Stack>
					</CardBody>
				</Card>
			</Box>}
		</>
	)
}
