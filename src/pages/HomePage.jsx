import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import FeedPost from "../components/post/FeedPost";

function HomePage() {
    const showToast = useShowToast();

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getFeedPosts = async () => {
        setIsLoading(true);
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
        <div>
            {isLoading === true && <Flex justify={"center"}>
                <Spinner size={"xl"}/>
            </Flex>}

            {isLoading === false && posts?.length === 0 &&
                <h1>Follow some users to see some exciting threads!</h1>
            }

            {isLoading === false && posts?.length > 0 && 
                posts?.map((post, index) => {
                    return <FeedPost key={`feedpost-${index}`} postedBy={post?.postedBy} post={post}/>
                })
            }
        </div>
    );
}

export default HomePage;