import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  useToast,
	Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userAtom from '../store/atom/userAtom';
import axios from 'axios';

const CompanyForm = () => {
	const [currentUser, setCurrentUser] = useRecoilState(userAtom)

	const navigate = useNavigate()
  const toast = useToast();

	const [gstCert, setGstCert] = useState(null);
	const [panCard, setPanCard] = useState(null);
	const [corpCeft, setCorpCeft] = useState(null);

	const [companyData, setCompanyData] = useState(currentUser.company);

	function changeCompanyData(name, value) {
		setCompanyData((prev) => ({...prev, [name]: value}))
	}

  const handleSubmit = async (event) => {
    event.preventDefault();
 
		const formData = new FormData();

		for(var key in companyData) {
			formData.append(`company[${key}]`, companyData[key]);
		}
		if (gstCert) formData.append("company[gst_certificate]", gstCert, gstCert.name)
		if (panCard) formData.append("company[pan_card]", panCard, panCard.name)
		if (corpCeft) formData.append("company[incorporation_certificate]", corpCeft, corpCeft.name)
		try {
			const res = await axios.put(`${import.meta.env.VITE_API_API_URL}/companies/${companyData.id}/resubmit`, formData, {
				headers: { 
					'Content-Type': 'multipart/form-data',
					'Authorization': localStorage.getItem('token')
				}
			})
			toast({
			  title: res.data.message,
			  status: "success",
			  duration: 5000,
			  isClosable: true,
			});
			setCurrentUser({...currentUser, company: res.data.company})
			navigate("/")
		} catch(err) {
			console.log(err)
			if (err?.response?.data?.errors && err.response.data.errors.length > 0) {
				err.response.data.errors.forEach(error => {
					toast({
						title: error,
						status: "error",
						duration: 5000,
						isClosable: true,
					})
				})
			}
		}

  };

  return (
		<>
			{companyData &&
				<Box maxW="600px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg">
					<Heading as="h1" size="lg" mb={6}>
						Update Company Information
					</Heading>
					<form onSubmit={handleSubmit}>
						<VStack spacing={4}>

							<FormControl id="legal_name" isRequired>
								<FormLabel>Legal Name</FormLabel>
								<Input type="text" name='legal_name' value={companyData.legal_name} onChange={e => changeCompanyData(e.target.name, e.target.value)} />
							</FormControl>

							<FormControl id="company_email" isRequired>
								<FormLabel>Company Email</FormLabel>
								<Input type="email" name='email' value={companyData.email} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="address" isRequired>
								<FormLabel>Address</FormLabel>
								<Textarea name='address' value={companyData.address} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="phone_number" isRequired>
								<FormLabel>Phone Number</FormLabel>
								<Input type="tel" name='phone_number' value={companyData.phone_number} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="director_name" isRequired>
								<FormLabel>Director Name</FormLabel>
								<Input type="text" name='director_name' value={companyData.director_name} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="director_designation" isRequired>
								<FormLabel>Director Designation</FormLabel>
								<Input type="text" name='director_designation' value={companyData.director_designation} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="director_info" isRequired>
								<FormLabel>Director Info</FormLabel>
								<Textarea name='director_info' value={companyData.director_info} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="primary_contact_person" isRequired>
								<FormLabel>Primary Contact Person</FormLabel>
								<Input type="text" name='primary_contact_person' value={companyData.primary_contact_person} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="primary_contact_info" isRequired>
								<FormLabel>Primary Contact Info</FormLabel>
								<Input type="text" name='primary_contact_info' value={companyData.primary_contact_info} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="gst_certificate_no" isRequired>
								<FormLabel>GST No.</FormLabel>
								<Input type="text" name='gst_certificate_no' value={companyData.gst_certificate_no} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="pan_number" isRequired>
								<FormLabel>PAN Number</FormLabel>
								<Input type="text" name='pan_number' value={companyData.pan_number} onChange={e => changeCompanyData(e.target.name, e.target.value)}  />
							</FormControl>

							<FormControl id="gst_certificate">
								<FormLabel>GST Certificate</FormLabel>
								<Input type="file" name='gst_certificate' accept=".png,.jpg,.jpeg,.pdf" onChange={e => setGstCert(e.target.files[0])} />
							</FormControl>

							<FormControl id="pan_card">
								<FormLabel>PAN Card</FormLabel>
								<Input type="file" name='pan_card' accept=".png,.jpg,.jpeg,.pdf" onChange={e => setPanCard(e.target.files[0])} />
							</FormControl>

							<FormControl id="incorporation_certificate">
								<FormLabel>Incorporation Certificate</FormLabel>
								<Input type="file" name='incorporation_certificate' accept=".png,.jpg,.jpeg,.pdf" onChange={e => setCorpCeft(e.target.files[0])} />
							</FormControl>

							<Button type="submit" colorScheme="teal" size="lg" width="full">
								Update
							</Button>
						</VStack>
					</form>
				</Box>}
		</>
  );
};

export default CompanyForm;
