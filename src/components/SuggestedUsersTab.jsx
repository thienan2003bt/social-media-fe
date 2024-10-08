import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";

function SuggestedUsersTab() {
    const skeletonUsers = [1, 2, 3, 4, 5];
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [isLoadingSuggestedUsers, setLoadingSuggestedUsers] = useState(true);

    const showToast = useShowToast();


    useEffect(() => {
        const getSuggestedUsers = async () => {
            setLoadingSuggestedUsers(true);
            try {
                const response = await fetch(`http://localhost:5000/users/suggested`, {
                    method: "GET",
                    credentials: "include",
                })
                const data = await response.json();
                if(data.error || !data.data) {
                    return showToast("API Error getting suggested users", data.error, "error")
                }

                setSuggestedUsers(data.data);
            } catch (error) {
                showToast("Error getting suggested users", error.message, "error")
            } finally {
                setLoadingSuggestedUsers(false);
            }
        }

        getSuggestedUsers();
    }, []);


    return (
        <div>
            <Text mb={4} fontWeight={"bold"}>Suggested users</Text>
            
            <Flex direction={"column"} gap={4}>
                {isLoadingSuggestedUsers === true && 
                    skeletonUsers.map((skeUser, id) => {
                        return <Flex key={`skeleton-user-${id}`}
                                gap={2} alignItems={"center"} p={1} borderRadius={"md"}
                            >
                            <Box>
                                <SkeletonCircle size={10}/>
                            </Box>
                            <Flex w={"full"} flexDirection={"column"} gap={2}>
                                <Skeleton h={"8px"} w={"80px"}/>
                                <Skeleton h={"8px"} w={"90px"}/>
                            </Flex>
                            <Flex>
                                <Skeleton h={"20px"} w={"60px"}/>
                            </Flex>
                        </Flex>
                    })
                }

                {isLoadingSuggestedUsers === false && suggestedUsers?.length && suggestedUsers?.length > 0 &&
                    suggestedUsers.map((user, index) => {
                        return <Flex key={`suggested-user-${index}`}>
                            <SuggestedUser user={user} />
                        </Flex>
                    })
                }
            </Flex>
        </div>
    );
}

export default SuggestedUsersTab;