import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Conversation from "../components/chat/Conversation";
import MessageContainer from "../components/chat/MessageContainer";
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationAtom, selectedConversationAtom } from '../atoms/messageAtom';
import { GiConversation } from "react-icons/gi";

function ChatPage() {
    const [loadingConversation, setLoadingConversation] = useState(false);
    const [conversations, setConversations] = useRecoilState(conversationAtom);

    const  selectedConversation = useRecoilValue(selectedConversationAtom);

    const showToast = useShowToast();

    const getConversations = async () => {
        setLoadingConversation(true);
        try {
            const response = await fetch(`http://localhost:5000/messages/conversations`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();

            if(data.error) {
                return showToast("API Error getting conversations", data.error, "error")
            }

            console.log("Conversations: ");
            console.log(data.data);
            setConversations(data.data);
        } catch (error) {
            showToast("Error getting conversations", error.message, "error")
        } finally {
            setLoadingConversation(false);
        }
    }


    useEffect(() => {
        console.log("Selected Conversation: ");
        console.log(selectedConversation);
        getConversations();
    }, [])

    return (
        <Box position={"absolute"} w={{ lg: "60vw", md: "80%", base: "100%"}}
            left={"50%"} transform={"translateX(-50%)"} 
            border={"1px solid"} p={4} borderRadius={"md"}
        >
            <Flex gap={4} flexDirection={{base: "column", md: "row"}} maxW={{sm: "400px", md: "full"}} mx={"auto"}>
                <Flex className="chat-conversation"
                    flex={30} gap={2} flexDirection={"column"}
                    maxW={{sm: "250px", md: "full"}}
                >
                    <Text fontWeight={"700"} color={useColorModeValue("gray.600, gray.400")}>
                        Conversation
                    </Text>
                    <form>
                        <Flex alignItems={"center"} gap={2}>
                            <Input placeholder="Search for a user" />
                            <Button size={"sm"}>
                                <SearchIcon size={20}/>
                            </Button>
                        </Flex>
                    </form>

                    {conversations?.map((conversation, id) => {
                        return <Flex key={`conversation-${id}`} gap={4} alignItems={"center"}
                        p={1} borderRadius={"md"} overflowY={"auto"}>
                            {loadingConversation === true && conversations?.length > 0 
                            // Skeleton components
                            ? <> 
                                <Box>
                                    <SkeletonCircle size={10}/>
                                </Box>
                                <Flex w={"full"} flexDirection={"column"} gap={3}>
                                    <Skeleton h={"10px"} w={"80px"} />
                                    <Skeleton h={"8px"} w={"90%"} />
                                </Flex>
                            </>
                            // Real Message component
                            : <Flex w={"full"} flexDirection={"column"} gap={3}>
                                <Conversation  conversation={conversation}/>
                            </Flex>
                            }
                        </Flex>
                        }
                    )}
                </Flex>

                {selectedConversation?._id !== ''
                    ? <Flex flex={70} borderRadius={"md"} p={2} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"400px"}>
                        <GiConversation size={100}/>
                        <Text fontSize={"20"}>Select a conversation to start messaging</Text>
                    </Flex>
                    : <Flex className="chat-message-container"
                        flex={70} maxH={"75vh"}>
                            <MessageContainer />
                    </Flex>
                }
            </Flex>
        </Box>
    );
}

export default ChatPage;