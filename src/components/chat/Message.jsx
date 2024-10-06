import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../../atoms/messageAtom";
import { BsCheck2All } from "react-icons/bs";
import userAtom from "../../atoms/userAtom";

function Message({ msg, ownMessage }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const user = useRecoilValue(userAtom)

    return (<Flex flexDirection={"column"} justifyContent={"start"}>
    {ownMessage === true
        ?   <Flex gap={2} alignSelf={"flex-end"}>  
                <Flex bg={"blue.400"} maxW={"250px"} p={1} borderRadius={"25px"}>
                    <Text maxW={"250px"} p={3} borderRadius={"25px"}>
                        {msg?.text}
                    </Text>
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

                <Text maxW={"250px"} bg={"gray.700"} p={3} borderRadius={"25px"}>
                    {msg?.text}
                </Text>
            </Flex>
    }
    </Flex>
    );
}

export default Message;