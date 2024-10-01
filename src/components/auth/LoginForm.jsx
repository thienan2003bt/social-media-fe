import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../../atoms/authAtom'
import useShowToast from '../../hooks/useShowToast'
import userAtom from '../../atoms/userAtom'
import { useNavigate } from 'react-router-dom'
  
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [inputs, setInputs] = useState({username: '', password: ''})
    const navigate = useNavigate();
    
    const setUser = useSetRecoilState(userAtom);
    const setAuthScreenState = useSetRecoilState(authScreenAtom);
    const showToast = useShowToast();


    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });

        const data = await response.json();
        if(data.message?.startsWith("Error") === true) {
          showToast("Error logging in", data.message, "error");
        } else {
          localStorage.setItem("user-threads", JSON.stringify(data));
          setUser(data);
          document.cookie = `jwt=${data?.jwt ?? ''}`
          navigate('/');
        }
      } catch (error) {
        showToast("Error logging in", error.message, "error");
      }
    }
    return (
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}
            w={{
              base: "full",
              sm: "400px",
            }}
            >
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={(e) => setInputs({...inputs, username: e.target.value})} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                  onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue("gray.600", "gray.700")}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.800"),
                  }}
                  onClick={() => handleLogin()}
                  >
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Does not have an account? <Link color={'blue.400'} onClick={() => setAuthScreenState("signup")}>Signup</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
}