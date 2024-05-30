import React, { useEffect, useState } from 'react'
import CompanyInfo from './CompanyInfo'
import Api from '../axios'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
	useDisclosure,
	VStack,
	Box,
	Heading,
	Text,
	Flex,
	Spacer,
	Container
} from '@chakra-ui/react'
import { companyStatusBadge } from '../utils'

export default function Companies() {
	const [company, setCompany] = useState(null)
	const [companies, setCompanies] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const showCompany = (c) => {
    setCompany(c)
    onOpen()
  }

	async function fetchCompanies() {
		try {
			const res = await Api.get('/companies')
			setCompanies(res.data)
		} catch (err) {
			alert(err.response.data)
		}
	}

	useEffect(() => {
		fetchCompanies()
	}, [])

	return (
		<Container mt='10'>
			<Heading fontSize='2xl'>
				Manage Companies
			</Heading>
			<VStack my={10}>
				{companies.map(company => 
					<Box 
						p={5} shadow='md' 
						borderWidth='1px' w='500px' 
						style={{cursor: 'pointer'}}
						onClick={() => showCompany(company)}
					>
						<Flex>
							<Heading fontSize='lg'>{company.legal_name}</Heading>
							<Spacer />
							{companyStatusBadge(company.status, '0.7em')}
						</Flex>
						<Text mt={4}>{company.email} &nbsp; &nbsp;{company.phone_number}</Text>
					</Box>
				)}
			</VStack>
			
			<Drawer onClose={onClose} isOpen={isOpen} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{}</DrawerHeader>
          <DrawerBody>
            {company && <CompanyInfo company={company} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
			
		</Container>
	)
}
