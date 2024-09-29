import { useRecoilValue } from "recoil";
import LoginForm from "../components/auth/LoginForm";
import authScreenAtom from "../atoms/authAtom";
import SignupForm from "../components/auth/SignupForm";

function AuthPage() {
    const authScreenState = useRecoilValue(authScreenAtom);

    return (
        <div>
            { authScreenState === "login" 
                ? <LoginForm />
                : <SignupForm />
            }
        </div>
    );
}

export default AuthPage;