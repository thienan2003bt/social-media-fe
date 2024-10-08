import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../../atoms/messageAtom";
import { BsCheck2All } from "react-icons/bs";
import userAtom from "../../atoms/userAtom";
import { useState } from "react";

function Message({ msg, ownMessage }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const user = useRecoilValue(userAtom)

    const [isImageDisplayed, setIsImageDisplayed] = useState(false);

    return (<Flex flexDirection={"column"} justifyContent={"start"}>
    {ownMessage === true
        ?   <Flex gap={2} alignSelf={"flex-end"}>  
                <Flex bg={"blue.400"} maxW={"250px"} p={1} borderRadius={"25px"}>
                    {msg?.img
                        ?   <>
                            {isImageDisplayed === false
                                ? <Flex mt={5} w={"200px"}> 
                                    <Image src={msg.img} alt="Message image" borderRadius={4}
                                        onLoad={() => setIsImageDisplayed(true)}
                                    />
                                    <Skeleton w={"200px"} h={"200px"} />
                                </Flex>

                                : <Flex mt={5} w={"200px"}> 
                                    <Image src={msg.img} alt="Message image" borderRadius={4}/>
                                </Flex>
                            }
                        </>
                        : <Text maxW={"250px"} p={3} borderRadius={"25px"}>
                            {msg?.text}
                        </Text>
                    }
                    
                    <Box alignSelf={"flex-end"} mr={1} fontWeight={"bold"}
                        color={msg?.seen === true ? "blue.900" : ""}
                    >
                        <BsCheck2All size={16}/>
                    </Box>
                </Flex>

                <Avatar src={user?.profilePic} w={7} h={7}/>
            </Flex>
        :   <Flex gap={2}>
                <Avatar src={selectedConversation?.userProfilePic} w={7} h={7} />

                {msg?.img
                    ? <>
                    {isImageDisplayed === false
                        ? <Flex mt={5} w={"200px"}> 
                                <Image src={msg.img} alt="Message image" borderRadius={4}
                                    onLoad={() => setIsImageDisplayed(true)}                                    />
                                <Skeleton w={"200px"} h={"200px"} />
                            </Flex>

                        : <Flex mt={5} w={"200px"}> 
                            <Image src={msg.img} alt="Message image" borderRadius={4}/>
                        </Flex>
                    }
                    </>
                    : <Text maxW={"250px"} bg={"gray.700"} p={3} borderRadius={"25px"}>
                        {msg?.text}
                    </Text>
                    }

            </Flex>
    }
    </Flex>
    );
}

export default Message;