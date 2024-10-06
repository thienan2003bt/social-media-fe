import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useShowToast from "../../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { conversationAtom, selectedConversationAtom } from "../../atoms/messageAtom";
import userAtom from "../../atoms/userAtom";
import { useSocket } from "../../context/socketContext";

function MessageContainer() {
    const skeletonMessages = [1, 2, 3, 4, 5];

    const messageEndRef = useRef(null);

    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [messages, setMessages] = useState(skeletonMessages);

    const currentUser = useRecoilValue(userAtom);
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations = useSetRecoilState(conversationAtom)

    const showToast = useShowToast();
    const {socket} = useSocket();

    useEffect(() => {
        socket.on("newMessage", (message) => {
            if(selectedConversation._id === message.conversationId) {
                if(messages.findIndex(msg => msg._id && msg._id === message._id) === -1) {
                    setMessages((prev) => [...prev, { ...message }])
                }
            }

            setConversations((prev) => {
                const updatedConversations = prev.map(con => {
                    if(con._id === selectedConversation._id) {
                        return {
                            ...con,
                            lastMessage: {
                                text: message.img ? "An image has been sent." : message.text, 
                                sender: message.sender
                            }
                        }
                    }
                    return con;
                })
                
                return updatedConversations;
            })
        })

        return () => {
            socket.off('newMessage')
        }
    }, [socket])

    useEffect(() => {
        const isLastMessageFromOtherUser = messages?.length && messages[messages.length - 1]?.sender !== currentUser?._id;
        if(isLastMessageFromOtherUser) {
            socket.emit("markMessageAsSeen", {
                conversationId: selectedConversation._id,
                userId: selectedConversation.userId
            })
        }

        socket.on("messageSeen", ({conversationId}) => {
            if(selectedConversation._id === conversationId) {
                setMessages(prev => {
                    const updatedMessages = prev.map(msg => {
                        if(msg.seen === false) {
                            return {...msg, seen: true};
                        }
                        return msg;
                    })
                    return updatedMessages;
                })
            }
        })

        return () => {
            socket.off("messageSeen");
        }
    }, [messages, currentUser, selectedConversation, socket])


    useEffect(() => {
        const getMessages = async () => {
            setIsLoadingMessages(true);
            setMessages(skeletonMessages);
            if(selectedConversation?._id === '') {
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/messages/${selectedConversation?.userId}`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await response.json();
                if(data.error) {
                    return showToast("Error getting messages", data.error, "error")
                }

                setMessages(data.data);
            } catch (error) {
                showToast("Error getting messages", error.message, "error");
            } finally {
                setIsLoadingMessages(false);
            }
        }

        getMessages();
    }, [selectedConversation])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <Flex flex={70} bg={useColorModeValue("gray.200", "gray.dark")} 
            borderRadius={"md"} flexDirection={"column"} 
            p={2}
        >
            <Flex className="message-header" w={"full"} h={12} 
                alignItems={"center"} gap={2}
            >
                <Avatar src={selectedConversation?.userProfilePic} size={"sm"}/>
                <Text display={"flex"} alignItems={"center"} >
                    {selectedConversation?.username}
                    <Image src="/verified.png" w={4} h={4} ml={1}/>
                </Text>
            </Flex>

            <Divider />

            <Flex flexDirection={"column"} gap={4} p={2} my={4}
                overflowY={"scroll"} minH={"60vh"}
            >
                {messages?.map((msg, id) => {
                    return <Flex key={`message-${id}`} 
                        gap={2} alignItems={"center"} p={1}
                        borderRadius={"md"} flexDirection={"column-reverse"}
                        alignSelf={msg?.sender !== currentUser._id ? "flex-start" : "flex-end"}
                        ref={+messages?.length - 1 === messages.indexOf(msg) ? messageEndRef : null}
                    >
                        {isLoadingMessages === true
                        ? <>
                            {msg?.sender !== currentUser._id && <SkeletonCircle size={10}/>}
                            <Flex flexDirection={"column"} gap={2}>
                                <Skeleton h={"80px"} w={"250px"} borderRadius={"16px"}/>
                            </Flex>
                            {msg?.sender === currentUser._id && <SkeletonCircle size={10}/>}
                        </>
                        : <Message msg={msg} ownMessage={msg?.sender !== currentUser._id ? false : true} />
                        }
                    </Flex>
                })}
            </Flex>


            <MessageInput setMessages={setMessages}/>
        </Flex>

    );
}

export default MessageContainer;