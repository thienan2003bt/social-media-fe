import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

function MessageContainer() {
    const skeletonMessages = [1, 2, 3, 4, 5];
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [messages, setMessages] = useState(skeletonMessages);

    return (
        <Flex flex={70} bg={useColorModeValue("gray.200", "gray.dark")} 
            borderRadius={"md"} flexDirection={"column"} 
            p={2}
        >
            <Flex className="message-header" w={"full"} h={12} 
                alignItems={"center"} gap={2}
            >
                <Avatar src={""} size={"sm"}/>
                <Text display={"flex"} alignItems={"center"} >
                    Lee Chong Wei
                    <Image src="/verified.png" w={4} h={4} ml={1}/>
                </Text>
            </Flex>

            <Divider />

            <Flex flexDirection={"column"} gap={4}  my={4}
                overflowY={"scroll"} minH={"60vh"}
            >
                {messages?.map((msg, id) => {
                    return <Flex key={`message-${id}`} 
                        gap={2} alignItems={"center"} p={1}
                        borderRadius={"md"} 
                        alignSelf={id % 2 === 0 ? "flex-start" : "flex-end"}
                    >
                        {isLoadingMessages === true
                        ? <>
                            {id % 2 === 0 && <SkeletonCircle size={10}/>}
                            <Flex flexDirection={"column"} gap={2}>
                                <Skeleton h={"80px"} w={"250px"} borderRadius={"16px"}/>
                            </Flex>
                            {id % 2 === 1 && <SkeletonCircle size={10}/>}
                        </>
                        : <></>
                        }
                    </Flex>
                })}
            </Flex>
        </Flex>

    );
}

export default MessageContainer;