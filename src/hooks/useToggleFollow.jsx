import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function useToggleFollow(user) {
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);


    const handleFollowing = async () => {
        if(!currentUser) {
            return showToast("Authentication error", "Please login first to follow another user", 'error');
        }
        setIsLoading(true);
        
        try {
            const response = await fetch(`http://localhost:5000/users/follow/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })

            const data = await response.json();
            if(data.message?.includes("successfully") === true) {
                if(isFollowing === true) {
                    user.followers.pop();
                } else {
                    user.followers.push(currentUser?._id);
                }
                showToast("Follow user", data.message, "success");
                setIsFollowing(!isFollowing);
            } else {
                showToast("Error following user", data.message, "success");
            }

        } catch (error) {
            showToast("Error handling following user", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsFollowing(user?.followers?.includes(currentUser?._id) ?? false);
    }, [user, currentUser._id])

    return {handleFollowing, isLoading, isFollowing};
}

export default useToggleFollow;