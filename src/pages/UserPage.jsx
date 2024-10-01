import { useEffect, useState } from 'react';
import UserHeader from '../components/user/UserHeader';
import UserPost from '../components/user/UserPost';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';

function UserPage() {
    const [user, setUser] = useState({});
    const { username } = useParams();
    const showToast = useShowToast();

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
        }
    }

    useEffect(() => {
        getUser();
    }, [username])
    return (
        <div>
            <UserHeader userData={user} />
            <UserPost likes={132} replies={465} postImg={"/post1.png"} postTitle={"It's my first ever post on Threads."}/>
            <UserPost likes={798} replies={301} postImg={"/post2.png"} postTitle={"It's my first ever post on Threads."}/>
            <UserPost likes={132} replies={465} postImg={"/post3.png"} postTitle={"It's my first ever post on Threads."}/>
        </div>
    );
}

export default UserPage;