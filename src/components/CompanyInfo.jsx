import React from 'react'
import { Highlight, Card, CardHeader, CardBody, Stack, Box, Text, StackDivider, Heading, Flex, Spacer, Badge, Link } from '@chakra-ui/react'
import { companyStatusBadge } from '../utils'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function Company({company}) {
	return (
		<>
			<Card>
					<CardHeader>
						<Flex>
							<Heading size='lg'>Company Info</Heading>
							<Spacer />
							{companyStatusBadge(company.status)}
						</Flex>
						{company.status === 'rejected' && 
							<Text fontSize='1rem' color='tomato'><b>Reason of Rejection:</b> {company.rejection_reason}</Text>}
					</CardHeader>

					<CardBody>
						<Stack divider={<StackDivider />} spacing='4'>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Legal Name
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.legal_name}
								</Text>
							</Box>
							
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Email
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.email}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Address
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.address}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Phone Number
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.phone_number}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Director Name
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.director_name}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Director Designation
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.director_designation}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Director Info
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.director_info}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									PAN Number
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.pan_number}
									&nbsp;&nbsp; | &nbsp;&nbsp;
									<Link href={company.pan_card_url} color='blue' isExternal>PAN Card <ExternalLinkIcon mx='2px' /></Link>
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									GST No.
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.gst_certificate_no} 
									&nbsp;&nbsp; | &nbsp;&nbsp;
									<Link href={company.gst_certificate_url} color='blue' isExternal>GST Certificate <ExternalLinkIcon mx='2px' /></Link>
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Incorporation Certificate
								</Heading>
								<Text pt='2' fontSize='sm'>
									<Link href={company.incorporation_certificate_url} color='blue' isExternal>Incorporation Certificate <ExternalLinkIcon mx='2px' /></Link>
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Primary Contact Person
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.primary_contact_person}
								</Text>
							</Box>
							<Box mb={4}>
								<Heading size='xs' textTransform='uppercase'>
									Primary Contact Info
								</Heading>
								<Text pt='2' fontSize='sm'>
									{company.primary_contact_info}
								</Text>
							</Box>
						</Stack>
					</CardBody>
				</Card>
		</>
	)
}
