import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useToggleFollow from "../hooks/useToggleFollow";

function SuggestedUser({ user }) {
    const {handleFollowing, isLoading, isFollowing} = useToggleFollow(user);

    return (
        <Flex w="full" p={4} gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Flex className="left-side-suggested-user"
                gap={2} as={Link} to={`${user?.username}`}
            >
                <Avatar src={user?.profilePic} />
                <Box>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {user?.username}
                    </Text>
                    <Text fontSize={"sm"} color={"gray.light"}>
                        {user?.name}
                    </Text>
                </Box>
            </Flex>

            <Button className="right-side-suggested-user"
                size={"sm"} color={isFollowing === true ? "black" : "white"}
                bg={isFollowing === true ? "white" : "blue.400"}
                isLoading={isLoading}
                _hover={{
                    color: isFollowing === true ? "black" : "white",
                    opacity: "0.8"
                }}
                onClick={handleFollowing}
            >
                {isFollowing === true ? "Unfollow" : "Follow"}
            </Button>
        </Flex>
    );
}

export default SuggestedUser;