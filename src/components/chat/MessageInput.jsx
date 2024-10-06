import { Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { conversationAtom, selectedConversationAtom } from "../../atoms/messageAtom";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from '../../hooks/usePreviewImage';

function MessageInput({ setMessages }) {
    const [text, setText] = useState('');
    
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations = useSetRecoilState(conversationAtom);
    
    const showToast = useShowToast();
    const {handleImageChange, imageUrl, setImageUrl} = usePreviewImg();

    const imageRef = useRef(null);

    const {onClose}  = useDisclosure();


    const handleCloseImageModal = () => {
        onClose(); 
        setImageUrl("");
        if(imageRef.current && imageRef.current.value) {
            imageRef.current.value = "";
        }
    }


    const handleRetrievingData = (data) => {
        setMessages((prev) => [...prev, data])
        setText("");
        setImageUrl("");

        setConversations((prev) => {
            const updatedConversations = prev.map(con => {
                if(con._id === selectedConversation._id) {
                    return { ...con, lastMessage: {
                        text: imageUrl ? "An image has been sent." : text, 
                        sender: data.sender
                    }}
                }
                return con;
            })

            return updatedConversations;
        })
    }

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        if(!text && !imageUrl) {
            return;
        }
        setIsSendingMessage(true);
        try {
            const response = await fetch(`http://localhost:5000/messages/`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    recipientId: selectedConversation?.userId,
                    message: text,
                    img: imageUrl
                })
            });
            const data = await response.json();
            if(data.error) {
                return showToast("Error sending message", data.error, "error");
            }

            handleRetrievingData(data.data);
        } catch (error) {
            showToast("Error sending message", error.message, "error")
        } finally {
            setIsSendingMessage(false);
        }
    }

    return (
        <Flex gap={2} alignItems={"center"}> 
            <Flex flex={5} cursor={"pointer"} >
                <BsFillImageFill size={20} onClick={() => imageRef.current.click()}/>

                <Input type="file" hidden ref={imageRef} onChange={handleImageChange}/>
            </Flex>


            <form onSubmit={handleSubmitMessage} style={{ flex: 95 }}>
                <InputGroup>
                    <Input w={"full"} placeholder="Type a message" 
                    value={text} onChange={(e) => setText(e.target.value)}/>
                    
                    <InputRightElement _loading={isSendingMessage} onClick={handleSubmitMessage} cursor={"pointer"}>
                        <IoSendSharp />
                    </InputRightElement>
                </InputGroup>
            </form>

            <Modal isOpen={imageUrl}
                onClose={() => { handleCloseImageModal()}}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Send message with Image</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex mt={5} w={"full"}>
                            <Image src={imageUrl} />
                        </Flex>

                        <Flex my={2} justifyContent={"flex-end"}>
                            {isSendingMessage === false
                                ?   <IoSendSharp size={24} cursor={"pointer"} 
                                        onClick={handleSubmitMessage}
                                    />
                                :   <Spinner size={"md"}/>
                            }
                            
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default MessageInput;