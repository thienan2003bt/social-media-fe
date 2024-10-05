import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import '../../index.css';
import { CgMoreO } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import {Link as RouterLink} from 'react-router-dom';
import useShowToast from "../../hooks/useShowToast";

function UserHeader({ userData }) {
    const showToast = useShowToast();
    const [user, setUser] = useState(userData);
    const currentUser = useRecoilValue(userAtom);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
        .then(() => {
            showToast('Copy link to clipboard', "Profile link is copied to clipboard successfully",'success')
        });
    };

    const handleFollowing = async () => {
        if(!currentUser) {
            return showToast("Authentication error", "Please login first to follow another user", 'error');
        }
        setIsLoading(true);
        
        try {
            const response = await fetch(`http://localhost:5000/users/follow/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })

            const data = await response.json();
            if(data.message?.includes("successfully") === true) {
                if(isFollowing === true) {
                    user.followers.pop();
                } else {
                    user.followers.push(currentUser?._id);
                }
                showToast("Follow user", data.message, "success");
                setIsFollowing(!isFollowing);
            } else {
                showToast("Error following user", data.message, "success");
            }

        } catch (error) {
            showToast("Error handling following user", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setUser(userData);
    }, [userData])

    useEffect(() => {
        setIsFollowing(user?.followers?.includes(currentUser?._id) ?? false);
    }, [user, currentUser])

    
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>{user?.name}</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user?.username}</Text>
                        <Text fontSize={"xs"} p={2}
                            bg={"gray.dark"} color={"gray.light"}>
                            threads.net
                        </Text>
                        
                    </Flex>

                </Box>

                <Box>
                    <Avatar name={user.name}
                        src={user?.profilePic ?? ''} size={{
                            base: "md",
                            md: "xl"
                        }}
                    />
                </Box>

            </Flex>
    
            <Text>{user?.bio}</Text>
            {currentUser?._id === user?._id  
            ?   <Link as={RouterLink} to="/update">
                    <Button size={"sm"}>
                        Update profile
                    </Button>
                </Link>
            :   <Button size={"sm"} onClick={() => handleFollowing()} isLoading={isLoading}>
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            }


            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user?.followers?.length} followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}/>
                        <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"}/>
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"}/>
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={() => copyURL()}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex flex={1}  pb={3} cursor={"pointer"}
                    borderBottom={"1.5px solid white"} justifyContent={"center"}
                >
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} pb={3} cursor={"pointer"}
                    borderBottom={"1.5px solid gray"} justifyContent={"center"}
                    color={"gray.light"}
                >
                <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    );
}

export default UserHeader;