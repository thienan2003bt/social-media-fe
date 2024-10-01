import { Button } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function HomePage() {
    const user = useRecoilValue(userAtom);

    return (
        <div>
            <Button 
				w={"full"} onClick={() => window.location.replace(`/${user?.username}`)}>
				Visit profile page
			</Button>
        </div>
    );
}

export default HomePage;