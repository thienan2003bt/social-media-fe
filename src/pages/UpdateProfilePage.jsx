'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImage from '../hooks/usePreviewImage';

export default function UpdateProfilePage() {
    const [user] = useRecoilState(userAtom);

    const [inputs, setInputs] = useState({
        name: user?.name ?? '', 
        username: user?.username ?? '',
        email: user?.email ?? '',
        bio: user?.bio ?? '',
        profilePic: user?.profilePic ?? '',
        password: '',
    });

    const fileRef = useRef(null);
    const { handleImageChange, imageUrl } = usePreviewImage();

    useEffect(() => {
        // console.log("User: ");
        // console.log(user);
    }, [user]);
  
    return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      my={6}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}>
        <Heading w={"full"} textAlign={"center"} lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={imageUrl ?? inputs?.profilePic}/>
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
              <Input type='file' hidden ref={fileRef} onChange={(e) => handleImageChange(e)}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({...inputs, username: e.target.value})}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Fullname</FormLabel>
          <Input
            placeholder="Fullname"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.name}
            onChange={(e) => setInputs({...inputs, name: e.target.value})}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Bio"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.bio}
            onChange={(e) => setInputs({...inputs, bio: e.target.value})}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}