import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { conversationAtom, selectedConversationAtom } from "../../atoms/messageAtom";

function MessageInput({ setMessages }) {
    const [text, setText] = useState('');
    
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations = useSetRecoilState(conversationAtom);
    const showToast = useShowToast();


    const handleRetrievingData = (data) => {
        setMessages((prev) => [...prev, data])
        setText("");

        setConversations((prev) => {
            const updatedConversations = prev.map(con => {
                if(con._id === selectedConversation._id) {
                    return { ...con, lastMessage: {
                        text: text, 
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
        if(!text) {
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
                    message: text
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
        <form onSubmit={handleSubmitMessage}>
            <InputGroup>
                <Input w={"full"} placeholder="Type a message" 
                value={text} onChange={(e) => setText(e.target.value)}/>
                
                <InputRightElement _loading={isSendingMessage} onClick={handleSubmitMessage} cursor={"pointer"}>
                    <IoSendSharp />
                </InputRightElement>
            </InputGroup>
        </form>
    );
}

export default MessageInput;