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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate()
  const toast = useToast();
	const [gstCert, setGstCert] = useState(null);
	const [panCard, setPanCard] = useState(null);
	const [corpCeft, setCorpCeft] = useState(null);
	const [userData, setUserData] = useState({
		email: 'test111@yopmail.com',
		password: '123456',
		name: 'Test User'
	})
	const [companyData, setCompanyData] = useState({
		legal_name: 'Your Company Name',
		email: 'yourcompany@example.com',
		address: '123 Main Street, Anytown, CA 12345',
		phone_number: '555-555-5555',
		director_name: 'John Doe',
		director_designation: 'CEO',
		director_info: 'Some additional director information',
		pan_number: 'ABCDE1234F',
		primary_contact_person: 'Jane Smith',
		primary_contact_info: '555-777-5555',
		gst_certificate_no: '1234567890XYZ'
	});
	

	function changeUserData(name, value) {
		setUserData((prev) => ({...prev, [name]: value}))
	}

	function changeCompanyData(name, value) {
		setCompanyData((prev) => ({...prev, [name]: value}))
	}

  const handleSubmit = async (event) => {
    event.preventDefault();
 
		const formData = new FormData();
		for(var key in userData) {
			formData.append(`user[${key}]`, userData[key]);
		}
		for(var key in companyData) {
			formData.append(`user[company_attributes[${key}]]`, companyData[key]);
		}
		formData.append("user[company_attributes[gst_certificate]]", gstCert, gstCert.name)
		formData.append("user[company_attributes[pan_card]]", panCard, panCard.name)
		formData.append("user[company_attributes[incorporation_certificate]]", corpCeft, corpCeft.name)

		try {
			const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, formData, {
				headers: { 
					'Content-Type': 'multipart/form-data'
				}
			})
			toast({
			  title: "Account created",
			  status: "success",
			  duration: 5000,
			  isClosable: true,
			});
			navigate("/login")
		} catch(err) {
			if (err?.response?.data && err.response.data.length > 0) {
				err.response.data.forEach(error => {
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
    <Box maxW="600px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg">
			<Heading as="h1" size="lg" mb={6}>
        Register Account
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
					{/* <Heading as="h4" size="md" mt={3}>
						User Details
					</Heading> */}
					<FormControl id="name" isRequired>
						<FormLabel>Name</FormLabel>
						<Input type="text" name='name' value={userData.name} onChange={e => changeUserData(e.target.name, e.target.value)} />
					</FormControl>
					
					<FormControl id="email" isRequired>
						<FormLabel>Email</FormLabel>
						<Input type="email" name='email' value={userData.email} onChange={e => changeUserData(e.target.name, e.target.value)} />
					</FormControl>

					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
						<Input type="password" name='password' value={userData.password} onChange={e => changeUserData(e.target.name, e.target.value)} />
					</FormControl>
					
					<Heading as="h4" size="md" mt={3}>
						Company Details
					</Heading>

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

          <FormControl id="gst_certificate" isRequired>
            <FormLabel>GST Certificate</FormLabel>
            <Input type="file" name='gst_certificate' accept=".png,.jpg,.jpeg,.pdf" onChange={e => setGstCert(e.target.files[0])} />
          </FormControl>

          <FormControl id="pan_card" isRequired>
            <FormLabel>PAN Card</FormLabel>
            <Input type="file" name='pan_card' accept=".png,.jpg,.jpeg,.pdf" onChange={e => setPanCard(e.target.files[0])} />
          </FormControl>

          <FormControl id="incorporation_certificate" isRequired>
            <FormLabel>Incorporation Certificate</FormLabel>
            <Input type="file" name='incorporation_certificate' accept=".png,.jpg,.jpeg,.pdf" onChange={e => setCorpCeft(e.target.files[0])} />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
