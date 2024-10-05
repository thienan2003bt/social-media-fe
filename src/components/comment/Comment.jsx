import { Avatar, Flex, Text } from "@chakra-ui/react";

function Comment({ reply }) {

    return (
        <Flex gap={"4"} py={"2"} my={"2"} w={"full"}>
            <Avatar src={reply?.userProfilePic} size={"sm"}/>
            <Flex gap={"1"} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} alignItems={"center"} justify={"space-between"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{reply?.username}</Text>
                </Flex>

                <Text>{reply?.text}</Text>
            </Flex>
        </Flex>
    );
}

export default Comment;