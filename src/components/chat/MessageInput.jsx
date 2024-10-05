import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

function MessageInput() {
    const [text, setText] = useState('');
    

    return (
        <Flex>
            <InputGroup>
                <Input w={"full"} placeholder="Type a message" 
                value={text} onChange={(e) => setText(e.target.value)}/>
                <InputRightElement>
                    <IoSendSharp />
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
}

export default MessageInput;