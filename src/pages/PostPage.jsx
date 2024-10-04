import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import PostActions from "../components/post/PostActions";
import Comment from "../components/comment/Comment";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

function PostPage() {
    const showToast = useShowToast();
    const { pid } = useParams();


    const user = useRecoilValue(userAtom);
    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            const response = await fetch(`http://localhost:5000/posts/${pid}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });

            const data = await response.json();
            if(data.error) {
                return showToast("API Get post info error", data.error, "error")
            } else {
                setPost(data.data);
            }
        } catch (error) {
            showToast("Get post info error", error.message, "error")
        }
    }

    useEffect(() => {
        getPost();
    }, [pid])

    return (
    <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={"3"}>
                <Avatar src={user?.profilePic} size={"md"} name={user?.name} />

                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{user?.name}</Text>
                    <Image src="/verified.png" w={"4"} h={"4"} ml={2}/>
                </Flex>
            </Flex>

            <Flex gap={"4"} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>
                    1d
                </Text>
                <BsThreeDots />
            </Flex>
        </Flex>
        
        <Text my={"3"}>{post?.text}</Text>
        <Box borderRadius={"6"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src={post?.img} w={"full"} />
        </Box>

        <Flex gap={"3"} my={"3"}>
            <PostActions post={post} />
        </Flex>

        <Divider my={"4"}/>

        <Flex justifyContent={"space-between"}>
            <Flex gap={"2"} alignItems={"center"}>
                <Text fontSize={"2xl"}>👏</Text>
                <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
            </Flex>
            <Button>Get</Button>
        </Flex>
        <Divider my={"4"}/>
        
        {post?.replies?.length > 0 && post?.replies?.map((reply, id) => {
            return <Comment key={`reply-${id}`} comment={reply?.text} createdAt={post?.createdAt}
            likes={0}
            username={reply?.postedBy}
            userAvatar={reply?.userProfilePic} />
        })}
        
    </>);
}

export default PostPage;