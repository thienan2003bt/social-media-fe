import { AddIcon } from "@chakra-ui/icons";
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImage from "../../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import postAtom from "../../atoms/postAtom";

const MAX_CHARACTER = 500;

function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {handleImageChange, imageUrl, setImageUrl} = usePreviewImage();
    const user = useRecoilValue(userAtom);
    const fileRef = useRef(null);
    const showToast = useShowToast();

    const [postText, setPostText] = useState('');
    const [remainingChars, setRemainingChars] = useState(MAX_CHARACTER);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useRecoilState(postAtom);


    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if(inputText.length > MAX_CHARACTER) {
            const truncatedText = inputText.slice(0, +MAX_CHARACTER + 1);
            setPostText(truncatedText);
            setRemainingChars(0);
        } else {
            setPostText(inputText);
            setRemainingChars(+MAX_CHARACTER - inputText.length);
        }
    }
    
    const resetModal = () => {
        setPostText("");
        setRemainingChars(MAX_CHARACTER);
        setImageUrl("");
    }

    const handleCreatePost = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/posts/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body : JSON.stringify({
                    postedBy: user?._id,
                    text: postText,
                    img: imageUrl,
                })
            });

            const data = await response.json();

            if(data.error) {
                showToast("Error creating new post", data.message, "error")
            } else {
                showToast("Create new post", data.message, "success");
                setPosts([data.data, ...posts])

                onClose();
                resetModal();
            }
        } catch (error) {
            showToast("Error creating new post", error.message, "error")
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <>
            <Button position={"fixed"} bottom={"10"} right={"5"}  size={{ base: "sm", sm: "md"}}
                bg={useColorModeValue("gray.500", "gray.dark")}
                onClick={onOpen} title="Create post"
            >
                <AddIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea placeholder="Post content are here ..." value={postText} onChange={handleTextChange}/>
                            <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"right"} m={1} color={"white.800"}>
                                Remaining: {remainingChars} / {MAX_CHARACTER}.
                            </Text>
                            
                            <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
                            <BsFillImageFill style={{marginLeft: "5px", cursor: "pointer"}} size={"16"}
                            onClick={() => fileRef.current.click()} />
                        </FormControl>

                        {imageUrl && 
                        <Flex mt={"5"} w={"full"} position={"relative"}>
                            <Image maxW={"400px"} src={imageUrl} alt="Selected image" />
                            <CloseButton onClick={() => setImageUrl("")} bg={"gray.800"} 
                            position={"absolute"} top={"2"} right={"2"}/>  
                        </Flex>}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button colorScheme='green'isLoading={isLoading} mr={3} onClick={handleCreatePost}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreatePost;