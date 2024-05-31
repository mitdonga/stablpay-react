import React, { useEffect, useState } from 'react'
import CompanyInfo from './CompanyInfo'
import Api from '../axios'
import {
  Drawer,
  DrawerBody,
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
	Container,
	Button,
	Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
	Input,
	useToast
} from '@chakra-ui/react'
import { companyStatusBadge } from '../utils'

export default function Companies() {
	const toast = useToast()
	const [company, setCompany] = useState(null)

	const [openApproveModal, setOpenApproveModal] = useState(false)
	const [openRejectModal, setOpenRejectModal] = useState(false)
	const [rejectionReason, setRejectionReason] = useState('')
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

	function afterRequest(){
		setRejectionReason('')
		onClose()
		fetchCompanies()
	}

	function toggleApproveModal() {
		setOpenApproveModal((prev) => !prev)
	}

	function toggleRejectModal() {
		setOpenRejectModal((prev) => !prev)
	}

	async function handleApproval() {
		try {
			const res = await Api.put(`/companies/${company.id}/approve`)
			toast({
				title: res.data.message,
				status: "success", duration: 5000, isClosable: true
			})
			toggleApproveModal()
			afterRequest()
		} catch (error) {
			if (error?.response?.data && error.response.data.message) {
				toast({
					title: error.response.data.message,
					status: "error", duration: 5000, isClosable: true
				})
			}
		}
	}

	async function handleRejection() {
		try {
			const res = await Api.put(`/companies/${company.id}/reject`, {
				reason: rejectionReason
			})
			toast({
				title: res.data.message,
				status: "success", duration: 5000, isClosable: true
			})
			toggleRejectModal()
			afterRequest()
		} catch (error) {
			if (error?.response?.data && error.response.data.message) {
				toast({
					title: error.response.data.message,
					status: "error", duration: 5000, isClosable: true
				})
			}
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
            {company && 
						<>
							<CompanyInfo company={company} />
							{company.status == 'pending' && 
								<Box my='5'>
									<Button mr='5' colorScheme='green' onClick={toggleApproveModal}>Approve</Button>
									<Button colorScheme='red' onClick={toggleRejectModal}>Reject</Button>
								</Box>}
						</>
						}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

			<Modal onClose={toggleApproveModal} isOpen={openApproveModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to approve <b>{company?.legal_name}</b>?
          </ModalBody>
          <ModalFooter>
            <Button 
							colorScheme='green' mr='2' 
							onClick={handleApproval}
						>
							Approve
						</Button>
            <Button onClick={toggleApproveModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

			<Modal onClose={toggleRejectModal} isOpen={openRejectModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rejection Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to reject <b>{company?.legal_name}</b>? <br /><br />
						If yes, please provide the reason.<br /><br />
						<Input value={rejectionReason} onChange={e => setRejectionReason(e.target.value)}/>
          </ModalBody>
          <ModalFooter>
						<Button 
							colorScheme='red' mr='2' 
							onClick={handleRejection} 
							isDisabled={!rejectionReason}
						>
							Reject
						</Button>
            <Button onClick={toggleRejectModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
			
		</Container>
	)
}
