import { useEffect, useState } from 'react';
import UserHeader from '../components/user/UserHeader';
import UserPost from '../components/user/UserPost';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';

function UserPage() {
    const [user, setUser] = useState({});
    const { username } = useParams();
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        getUser();
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
                    <UserPost likes={132} replies={465} postImg={"/post1.png"} postTitle={"It's my first ever post on Threads."}/>
                    <UserPost likes={798} replies={301} postImg={"/post2.png"} postTitle={"It's my first ever post on Threads."}/>
                    <UserPost likes={132} replies={465} postImg={"/post3.png"} postTitle={"It's my first ever post on Threads."}/>
                </div>
            }
        </>
    );
}

export default UserPage;