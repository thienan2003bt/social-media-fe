import { useEffect, useState } from 'react';
import UserHeader from '../components/user/UserHeader';
import UserPost from '../components/user/UserPost';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import FeedPost from '../components/post/FeedPost';

function UserPage() {
    const [user, setUser] = useState({});
    const { username } = useParams();
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [isFetchingPosts, setIsFetchingPosts] = useState(false);


    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/profile/${username}`);
            let data = await response.json();
            if(data?.message?.startsWith("Error") === true) {
                return showToast("Error getting user's profile", data.message, "error");
            }
            setUser(data.data);
        } catch (error) {
            showToast("Error getting user's profile", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    const getPosts = async () => {
        setIsFetchingPosts(true);
        try {
            const response = await fetch(`http://localhost:5000/posts/user/${username}`);
            let data = await response.json();
            if(data?.error) {
                return showToast("Error API getting user's posts", data.error, "error");
            }
            setPosts(data.data);
        } catch (error) {
            showToast("Error getting user's posts", error.message, "error");
        } finally {
            setIsFetchingPosts(false);
        }
    }

    useEffect(() => {
        getUser();
        getPosts();
    }, [username])
    return (
        <>
            {!user && <h1>User not found.</h1>}
            {!user && isLoading === true &&
                <Flex justifyContent={"center"}>
                    <Spinner size={"lg"} />
                </Flex>
            }
            {user && 
                <div>
                    <UserHeader userData={user} />

                    {isFetchingPosts === true && 
                        <Flex>
                            <Spinner size={"xl"}/>
                        </Flex>
                    }

                    {isFetchingPosts === false && posts?.length === 0 && <h1>User has no posts.</h1>}

                    {isFetchingPosts === false && posts?.length > 0 && 
                        posts?.map((post, id) => <FeedPost key={`post-${id}`} post={post} postedBy={post?.postedBy ?? username}/>)
                    }


                    {/* <UserPost likes={132} replies={465} postImg={"/post1.png"} postTitle={"It's my first ever post on Threads."}/> */}
                    
                </div> 
            }
        </>
    );
}

export default UserPage;