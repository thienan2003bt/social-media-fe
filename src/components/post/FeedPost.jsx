import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PostActions from "../post/PostActions";
import { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import postAtom from "../../atoms/postAtom";

function FeedPost({ post, postedBy }) {
    const setPosts = useSetRecoilState(postAtom)
    const [user, setUser] = useState({});
    const currentUser = useRecoilValue(userAtom);

    const showToast = useShowToast();
    const navigate = useNavigate();

    const handleNavigateToOwnerPage = (e) => {
        e.preventDefault();
        navigate(`/${user?.username}`)
    }


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

            setPosts((previous) => previous.filter(p => p?._id !== post?._id))
            showToast("Delete Post Success", data.message, "success");
        } catch (error) {
            showToast("Delete Post Error", error.message, "error");
        } 
    }

    const handleNavigateToReplierPage = (e, replier) => {
        e.preventDefault();

        navigate(`/${replier?.username}`)
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/profile/${postedBy}`);
                let data = await response.json();
                if(data.error) {
                    return showToast("Get Post Owner API Error", data.error, "error");
                }
                console.log("user: ");
                console.log(data.data);
                setUser(data.data);
            } catch (error) {
                showToast("Get Post Owner Error", error, "error");
            }
        }

        getUser();
    }, [postedBy]);

    if(!user) {
        return null;
    }

    return (

        <div>
            <Link to={`/${user?.username ?? postedBy}/post/${post?._id}`} 
            >
                <Flex gap={3} mb={4} py={5}>
                    <Flex flexDirection={"column"} alignItems={"center"}>
                        <Avatar size="md" name={user?.name} src={user?.profilePic} 
                        onClick={(e) => handleNavigateToOwnerPage(e)}/>
                        <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
                        <Box position={"relative"} w={"full"}>
                            {post?.replies?.slice(0, 4)?.map((replier, id) => {
                                return <Avatar key={`replier-${id}`} size={"xs"} name={"Dan Abramov"} src={replier?.userProfilePic || "https://bit.ly/dan-abramov"} position={"absolute"} 
                                top={"0px"} left={"15px"} padding={"2px"} onClick={(e) => handleNavigateToReplierPage(e, replier)}
                            />
                            })}


                            {!post?.replies?.length && <Text size={"sm"} textAlign={"center"}>😕</Text>}
                        </Box>
                    </Flex>

                    <Flex flex={1} flexDirection={"column"} gap={2}>
                        <Flex justifyContent={"space-between"} w={"full"}>
                            <Flex w={"full"} alignItems={"center"}>
                                <Text fontSize={"sm"} fontWeight={"bold"}
                                    onClick={(e) => handleNavigateToOwnerPage(e)}
                                >
                                    {user?.name}
                                </Text>
                                <Image src="/verified.png" w={"4"} h={"4"} ml={"1"}/>
                            </Flex>

                            <Flex gap={"4"} alignItems={"center"}>
                                <Text fontSize={"xs"} width={16} textAlign={"right"} color={"gray.light"}>{formatDistanceToNow(new Date(post?.createdAt)) ?? '1d'} ago</Text>
                                {/* <BsThreeDots /> */}

                                {currentUser?._id === user?._id && 
                                    <DeleteIcon size={20} onClick={(e) => handleDeletePost(e)} />
                                }
                                
                            </Flex>
                        </Flex>

                        <Text fontSize={"sm"}>{post.text}</Text>
                        {post?.img &&  
                        <Box borderRadius={"6"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={post?.img} w={"full"} />
                        </Box>
                        }

                        <Flex gap={"3"} my={"1"}>
                            <PostActions post={post}/>
                        </Flex>

                    </Flex>
                </Flex>
            </Link>
        </div>
    );
}

export default FeedPost;