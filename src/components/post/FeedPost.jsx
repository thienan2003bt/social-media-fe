import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import PostActions from "../post/PostActions";
import { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { formatDistanceToNow } from 'date-fns'

function FeedPost({ post, postedBy }) {
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const showToast = useShowToast();
    const navigate = useNavigate();

    const handleNavigateToOwnerPage = (e) => {
        e.preventDefault();
        navigate(`/${user?.username}`)
    }

    const getUser = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/users/profile/${postedBy}`);
            let data = await response.json();
            if(data.error) {
                return showToast("Get Post Owner API Error", data.error, "error");
            }
            console.log("Post owner: ");
            console.log(data.data);
            setUser(data.data);
        } catch (error) {
            showToast("Get Post Owner Error", error, "error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

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
                            {post?.replies?.slice(0, 4)?.map((replier) => {
                                <Avatar size={"xs"} name={"Dan Abramov"} src={replier?.userProfilePic ?? "https://bit.ly/dan-abramov"} position={"absolute"} 
                                top={"0px"} left={"15px"} padding={"2px"}
                            />
                            })}

                            {!post?.replies?.length && <Text size={"sm"} textAlign={"center"}>😕</Text>}
                            
                            {/* <Avatar size={"xs"} name={"Dan Abramov"} src={"https://bit.ly/dan-abramov"} position={"absolute"} 
                                top={"0px"} left={"15px"} padding={"2px"}
                            />
                            <Avatar size={"xs"} name={"Segun Adebayo"} src={"https://bit.ly/sage-adebayo"} position={"absolute"} 
                                bottom={"0px"} right={"-5px"} padding={"2px"}
                            />
                            <Avatar size={"xs"} name={"Prosper Otemuyiwa"} src={"https://bit.ly/prosper-baba"} position={"absolute"} 
                                bottom={"0px"} left={"5px"} padding={"2px"}
                            /> */}
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
                                <BsThreeDots />
                            </Flex>
                        </Flex>

                        <Text fontSize={"sm"}>{post.text}</Text>
                        {post?.img &&  
                        <Box borderRadius={"6"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={post?.img} w={"full"} />
                        </Box>
                        }

                        <Flex gap={"3"} my={"1"}>
                            <PostActions liked={liked} setLiked={setLiked}/>
                        </Flex>

                        <Flex gap={"2"} alignItems={"center"}>
                            <Text color={"gray.light"} fontSize={"sm"}>{post?.replies?.length} replies</Text>
                            <Box w={"0.5"} h="0.5" borderRadius={"full"} bg={"gray.light"}></Box>
                            <Text fontSize={"sm"} color={"gray.light"}>{post?.likes?.length} likes</Text>
                            
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </div>
    );
}

export default FeedPost;