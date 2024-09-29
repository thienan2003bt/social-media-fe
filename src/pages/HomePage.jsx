import { Button } from "@chakra-ui/react";

function HomePage() {
    return (
        <div>
            <Button 
				w={"full"} onClick={() => window.location.replace('/mark')}>
				Visit profile page
			</Button>
        </div>
    );
}

export default HomePage;