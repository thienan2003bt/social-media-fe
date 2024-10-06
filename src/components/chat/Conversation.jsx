import { Avatar, AvatarBadge, Box, Flex, Image, Stack, Text, useColorModeValue, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from '../../atoms/userAtom';
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../../atoms/messageAtom";

function Conversation({ conversation, isOnline }) {
    const currentUser = useRecoilValue(userAtom);
    const colorMode = useColorModeValue("gray.400", "gray.600");

    const [bgColorForSelectedConversation, setBgColorForSelectedConversation] = useState(colorMode);

    const [otherParticipant, setOtherParticipant] = useState({});
    const [lastMessage, setLastMessage] = useState({});
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);


    const handleClickConversation = () => {       
        setSelectedConversation({
            _id: conversation._id,
            userId: otherParticipant?._id,
            username: otherParticipant?.username,
            userProfilePic: otherParticipant?.profilePic,
        })
    }

    const trimText = (text, size = 30) => {
        return text?.length >= size ? text.slice(0, size) + " ..." : text;
    }

    useEffect(() => {
        if(selectedConversation?._id === conversation._id) {
            setBgColorForSelectedConversation(colorMode);
        } else {
            setBgColorForSelectedConversation(colorMode === 'light' ? "gray.600" : "gray.dark");
        }

    }, [selectedConversation, colorMode, conversation])


    useEffect(() => {
        const handleRetrievingData = () => {
            setLastMessage(conversation?.lastMessage)
            const otherParticipant = conversation?.participants?.filter(user => user._id !== currentUser._id)[0];
            setOtherParticipant(otherParticipant);
        }

        handleRetrievingData()
    }, [conversation, currentUser])
    
    return (
        <Flex gap={4} alignItems={"center"} p={1} 
            _hover={{
                cursor: "pointer", 
                bg: useColorModeValue("gray.400", "gray.600"),
                color: "white"
            }}
            borderRadius={"md"}
            onClick={() => handleClickConversation()}
            bg={bgColorForSelectedConversation}
        >
            <WrapItem>
                <Avatar size={{base: "xs", sm: "sm", md: "md"}} 
                src={otherParticipant.profilePic}>
                    {isOnline ===  true && 
                        <AvatarBadge boxSize={"1em"} bg={"green.500"}/>
                    }
                </Avatar>

            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                    {otherParticipant?.username}
                    <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                
                {currentUser._id === lastMessage?.sender 
                    ? <Flex alignItems={"center"} gap={2}>
                        {lastMessage.seen === true  &&
                            <Box color={"blue.400"}>
                                <BsCheck2All size={16}/>
                            </Box>
                        }
                        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                            {trimText(lastMessage?.text)}
                        </Text>
                    </Flex>   
                    :   <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}
                            fontWeight={lastMessage.seen === false ? "bold" : "400"}
                        >
                            {trimText(lastMessage?.text)}
                        </Text>
                    }
            </Stack>
        </Flex>
    );
}

export default Conversation;