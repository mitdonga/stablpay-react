import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from '@chakra-ui/react';
import Api from '../axios'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userAtom from '../store/atom/userAtom';

const Login = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	
	const [_, setCurrentUser] = useRecoilState(userAtom)

	function updateFormData(label, value) {
		setFormData((prev) => ({...prev, [label]: value}));
	}

  const handleSubmit = async (event) => {
    event.preventDefault();
		try {
			const res = await Api.post("/login", formData)
			localStorage.setItem("token", res.data.token)
			setCurrentUser(res.data.user)
			navigate("/")
		} catch (error) {
			alert(error.response.data.error)
		}
  };

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      m="100px auto"
      boxShadow="md"
    >
      <Heading as="h1" size="lg" mb={6}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
							type="email" 
							name="email" 
							placeholder="Enter your email"
							onChange={(e) => updateFormData(e.target.name, e.target.value)}
						/>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input 
							type="password"
							name="password"
							placeholder="Enter your password" 
							onChange={(e) => updateFormData(e.target.name, e.target.value)}
						/>
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;