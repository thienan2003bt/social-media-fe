import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const handleLogout = async () => {
        try {
            localStorage.setItem("user-threads", JSON.stringify({}));
            setUser({});

            const response = await fetch("http://localhost:5000/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            if(data.message?.startsWith("Error") === true) {
                showToast("Error logging out", data.message, "error")
            } else {
                window.location.replace('/auth');
            }
        } catch (error) {
            console.error("Error logging out: ", error.message);
            showToast("Error logging out", error.message, "error")
        }
    }

    return (
        <Button size={"sm"}
            onClick={() => handleLogout()}
        >
            <FiLogOut />
        </Button>
    );
}

export default LogoutButton;