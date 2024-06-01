import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import userSelector from '../store/selectors/userSelector'

export default function Nav() {
	const currentUser = useRecoilValue(userSelector)
	
  const { colorMode, toggleColorMode } = useColorMode();
	const [isLogin, setIsLogin] = useState(false);

	function handleLogout() {
		localStorage.removeItem('token');
		window.location.replace('/login')
	}

	useEffect(() => {
		if (currentUser?.email) setIsLogin(true)
	}, [currentUser])

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>StablPay</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
							{
								isLogin ? 
								<Button variant='outline' onClick={handleLogout}>
									Logout
								</Button> :
								<>
									<Button variant='outline' onClick={() => window.location.replace('/login')}>
										Login
									</Button>
									<Button variant='outline' onClick={() => window.location.replace('/signup')}>
										SignUp
									</Button>
								</>
							}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}