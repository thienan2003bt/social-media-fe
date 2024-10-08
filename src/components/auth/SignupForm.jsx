import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
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
import authScreenAtom from '../../atoms/authAtom';
import { useSetRecoilState } from 'recoil';
import useShowToast from '../../hooks/useShowToast';
import userAtom from '../../atoms/userAtom';
  
export default function SignupForm() {
    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);

    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreenState = useSetRecoilState(authScreenAtom);
    const [inputs, setInputs] = useState({
      name: '', username: '', password: '', email: ''
    });

    const handleSignup = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/signup", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        });

        const data = await response.json();
        if(data.message.startsWith("Error") === true) {
          throw new Error(data.message);
        } else {
          localStorage.setItem("user-threads", JSON.stringify(data.data))
        }
        setUser(data.data);
        showToast("Success", "Create new user successfully!", "success");
        window.location.replace('/mark');

      } catch (error) {
        console.error("Error signing up: " + error.message);
        showToast("'Error signing up", error.message, "error")
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
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl  isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input type="text" onChange={(e) => setInputs({...inputs, name: e.target.value})}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onChange={(e) => setInputs({...inputs, username: e.target.value})}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
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
                  onClick={() => handleSignup()}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={() => setAuthScreenState("login")}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
}