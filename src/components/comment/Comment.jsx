import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import PostActions from "../post/PostActions";

function Comment({ comment, createdAt, likes, username, userAvatar }) {
    const [liked, setLiked] = useState(false);

    return (
        <Flex gap={"4"} py={"2"} my={"2"} w={"full"}>
            <Avatar src={userAvatar} size={"sm"}/>
            <Flex gap={"1"} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} alignItems={"center"} justify={"space-between"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                    <Flex gap={"2"} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                        <BsThreeDots />
                    </Flex>
                </Flex>

                <Text>{comment}</Text>
                <PostActions liked={liked} setLiked={setLiked} post={{}}/>
                <Text fontSize={"sm"} color={"gray.light"}>{likes + (liked === true ? 1 : 0)} likes</Text>
            </Flex>
        </Flex>
    );
}

export default Comment;