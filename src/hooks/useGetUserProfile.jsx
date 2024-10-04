import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { useParams } from "react-router-dom";

function useGetUserProfile() {
    const { username } = useParams();
    const [user ,setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    const showToast = useShowToast();
    
    useEffect(() => {
        const getUser = async () => {
            try {
                console.log("Username: " + username);
                const response = await fetch(`http://localhost:5000/users/profile/${username}`);
                let data = await response.json();
                if(data.error) {
                    return showToast("Error getting user's profile", data.error, "error");
                }
                setUser(data.data);
            } catch (error) {
                showToast("Error getting user's profile", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }
        getUser();
    }, [username])

    return {isLoading, user};
}

export default useGetUserProfile;