import { Avatar, AvatarBadge, Flex, Image, Stack, Text, useColorModeValue, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from '../../atoms/userAtom';
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../../atoms/messageAtom";

function Conversation({ conversation }) {
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

    useEffect(() => {
        if(selectedConversation?._id === conversation._id) {
            setBgColorForSelectedConversation(colorMode);
        } else {
            setBgColorForSelectedConversation(colorMode === 'light' ? "gray.600" : "gray.dark");
        }

    }, [selectedConversation, colorMode, conversation])


    useEffect(() => {
        const handleRetrievingData = () => {
            const text = (conversation?.lastMessage?.text?.length >= 100) ? conversation?.lastMessage?.text?.slice(0, 101) : conversation?.lastMessage?.text;
            const theLastMessage = {
                sender: conversation?.lastMessage?.sender,
                text: text
            };
            setLastMessage(theLastMessage);
            
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
                    <AvatarBadge boxSize={"1em"} bg={"green.500"}/>
                </Avatar>

            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                    {otherParticipant?.username}
                    <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}
                    fontWeight={lastMessage?.sender !== currentUser?._id ? "bold" : "500"}
                >
                    {currentUser._id === lastMessage?.sender && <BsCheck2All/>}
                    {lastMessage?.text}
                </Text>
            </Stack>
        </Flex>
    );
}

export default Conversation;