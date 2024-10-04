import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostActions from "../components/post/PostActions";
import Comment from "../components/comment/Comment";
import { useNavigate, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { formatDistanceToNow } from 'date-fns';

function PostPage() {
    const showToast = useShowToast();
    const { pid } = useParams();
    const currentUser = useRecoilValue(userAtom);
    const { user, isLoading }= useGetUserProfile();

    const navigate = useNavigate();

    const [post, setPost] = useState({});

    const handleDeletePost = async (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this post? You cannot undo this") === false) {
            return;
        }
        try {

            const response = await fetch(`http://localhost:5000/posts/delete/${post?._id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json();
            if(data.error) {
                return showToast("Delete Post API Error",data.error, "error");
            }

            showToast("Delete Post Success", data.message, "success");
            navigate(`/${currentUser.username}`)
        } catch (error) {
            showToast("Delete Post Error", error.message, "error");
        } 
    }
    
    useEffect(() => {
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
                    console.log("Post info: ");
                    console.log(data.data);
                    setPost(data.data);
                }
            } catch (error) {
                showToast("Get post info error", error.message, "error")
            }
        }
        getPost();
    }, [pid])

    if(isLoading === true && !user) {
        return (<Flex>
            <Spinner size="xl" />
        </Flex>)
    }

    if(!post) {
        return null;
    }

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
                <Text fontSize={"xs"} width={16} textAlign={"right"} color={"gray.light"}>
                    {post?.createdAt ? formatDistanceToNow(new Date(post?.createdAt)) : '1d'} ago
                </Text>

                {currentUser?._id === user?._id && 
                    <DeleteIcon size={20} onClick={(e) => handleDeletePost(e)} />
                }
                                
            </Flex>
        </Flex>
        
        <Text my={"3"}>{post?.text}</Text>
        {post?.img && 
            <Box borderRadius={"6"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image src={post?.img} w={"full"} />
            </Box>
        }

        <Flex gap={"3"} my={"3"}>
            <PostActions post={post} />
        </Flex>

        <Divider my={"4"}/>

        <Flex justifyContent={"space-between"}>
            <Flex gap={"2"} alignItems={"center"}>
                <Text fontSize={"2xl"}>👏</Text>
                <Text color={"gray.light"}>
                    Get the app to like, reply and post.
                </Text>
            </Flex>
            <Button>Get</Button>
        </Flex>
        <Divider my={"4"}/>
        
        {post?.replies?.length > 0 && post?.replies?.map((reply, id) => {
            return <Comment key={`reply-${id}`} reply={reply }comment={reply?.text} createdAt={post?.createdAt}
            likes={0}
            username={reply?.postedBy}
            userAvatar={reply?.userProfilePic} />
        })}
        
    </>);
}

export default PostPage;