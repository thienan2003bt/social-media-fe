import { Avatar, Flex, Text } from "@chakra-ui/react";

function Message({ ownMessage }) {
    return (<Flex flexDirection={"column"} justifyContent={"start"}>
    {ownMessage === true
        ?   <Flex gap={2} alignSelf={"flex-end"}>  
                <Text maxW={"250px"} bg={"blue.400"} p={3} borderRadius={"25px"}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum cumque illum dignissimos quia deserunt aliquid culpa odit temporibus praesentium voluptate.
                </Text>
            </Flex>
        :   <Flex gap={2}>
                <Avatar src={""} w={7} h={7} />

                <Text maxW={"250px"} bg={"gray.700"} p={3} borderRadius={"25px"}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum cumque illum dignissimos quia deserunt aliquid culpa odit temporibus praesentium voluptate.
                </Text>
            </Flex>
    }
    </Flex>
    );
}

export default Message;