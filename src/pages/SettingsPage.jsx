import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

function SettingsPage() {

    const showToast = useShowToast();
    const logout = useLogout();

    const freezeAccount = async () => {
        if(window.confirm("Are you sure you want to freeze your account?") === false) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/users/freeze", {
                method: "PATCH",
                credentials: "include",
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json();
            if(data.error) {
                return showToast("API Error freezing your account", data.error, "error")
            }

            logout();
            showToast("Freezing account", data.message, "success");
        } catch (error) {
            showToast("Error freezing your account", error.message, "error")
        }
    }

    return (
        <>
            <Text my={1} fontWeight={"bold"}>Freeze your account</Text>
            <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
            <Button size={"sm"} colorScheme="red" 
                onClick={() => freezeAccount()}
            >
                Freeze
            </Button>
        </>
    );
}

export default SettingsPage;