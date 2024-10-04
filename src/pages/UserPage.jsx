import { useEffect, useState } from 'react';
import UserHeader from '../components/user/UserHeader';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import FeedPost from '../components/post/FeedPost';
import useGetUserProfile from '../hooks/useGetUserProfile';

function UserPage() {
    const { username } = useParams();
    const { user, isLoading } = useGetUserProfile();
    const showToast = useShowToast();

    const [posts, setPosts] = useState([]);
    const [isFetchingPosts, setIsFetchingPosts] = useState(false);

    
    useEffect(() => {
        const getPosts = async () => {
            if(!user) {
                return;
            }
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
                        posts?.map((post, id) => {
                        return <FeedPost key={`post-${id}`} post={post} postedBy={post?.postedBy ?? username}/>
                    })}


                    {/* <UserPost likes={132} replies={465} postImg={"/post1.png"} postTitle={"It's my first ever post on Threads."}/> */}
                    
                </div> 
            }
        </>
    );
}

export default UserPage;