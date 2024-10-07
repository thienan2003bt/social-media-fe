import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";

function useLogout() {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/logout", {
                method: "POST",
                credentials: "include",
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            if(data.error) {
                return showToast("Error logging out", data.error, "error")
            }

            localStorage.removeItem("user-threads");
            setUser(null);
        } catch (error) {
            showToast("Error logging out", error.message, "error")
        }
    }

    return logout;
}

export default useLogout;