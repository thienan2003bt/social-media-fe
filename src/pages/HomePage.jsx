import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import FeedPost from "../components/post/FeedPost";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";
import SuggestedUsersTab from "../components/SuggestedUsersTab";

function HomePage() {
    const showToast = useShowToast();

    const [posts, setPosts] = useRecoilState(postAtom);
    const [isLoading, setIsLoading] = useState(false);

    const getFeedPosts = async () => {
        setIsLoading(true);
        setPosts([]);
        try {
            const response = await fetch("http://localhost:5000/posts/feeds", {
                credentials: "include"
            });
            const data = await response.json();

            if(data.error) {
                showToast("Get feed posts API error", data.error, "error");
            } else {
                console.log("Posts: ");
                console.log(data.data);
                setPosts(data.data);
            }
        } catch (error) {
            showToast("Get feed posts error", error, "error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFeedPosts();
    }, []);


    return (
        <Flex gap={10}>
            <Box flex={70}>
                {isLoading === true && <Flex justify={"center"}>
                    <Spinner size={"xl"}/>
                </Flex>}

                {isLoading === false && posts?.length === 0 &&
                    <h1>Follow some users to see some exciting threads!</h1>
                }

                {isLoading === false && posts?.length > 0 && 
                    posts?.map((post, index) => {
                        console.log("Feed post: " + index);
                        return <FeedPost key={`feedpost-${index}`} postedBy={post?.postedBy} post={post}/>
                    })
                }
            </Box>

            <Box flex={30} border={"1px solid red"} alignItems={"flex-start"}
            display={{base: "none", md: "block"}}>
                <SuggestedUsersTab />
            </Box>
        </Flex>
    );
}

export default HomePage;