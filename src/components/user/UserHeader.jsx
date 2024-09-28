import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast, VStack } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import '../../index.css';
import { CgMoreO } from "react-icons/cg";

function UserHeader() {
    const toast = useToast();


    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
        .then(() => {
            toast({ 
                title: 'Copy link to clipboard',
                description: "Profile link is copied to clipboard successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            })
        });
    };

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zuckerberg</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>markzuckerberg</Text>
                        <Text fontSize={"xs"} p={2}
                            bg={"gray.dark"} color={"gray.light"}>
                            threads.net
                        </Text>
                        
                    </Flex>

                </Box>

                <Box>
                    <Avatar name="Mark Zuckerberg"
                        src="/zuck-avatar.png" size={"xl"}
                    />
                </Box>

            </Flex>
    
            <Text>Co-founder, executive chairman and CEO of Meta Platforms.</Text>
                    
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2K followers</Text>
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