import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../../atoms/messageAtom";

function Message({ msg, ownMessage }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom);


    return (<Flex flexDirection={"column"} justifyContent={"start"}>
    {ownMessage === true
        ?   <Flex gap={2} alignSelf={"flex-end"}>  
                <Text maxW={"250px"} bg={"blue.400"} p={3} borderRadius={"25px"}>
                    {msg?.text}
                </Text>
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