import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import userAtom from "../atoms/userAtom";

const _SocketContext = createContext();

export const useSocket = () => {
    return useContext(_SocketContext)
}

function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const newSocket = io("http://localhost:5000", {
            query: {userId: user?._id}
        })

        setSocket(newSocket);
        newSocket.on("getOnlineUsers", (users) => setOnlineUsers(users))

        return () => newSocket && newSocket.close();
    }, [user?._id])

    return (
        <_SocketContext.Provider
            value={{ socket, onlineUsers }}
        >
            {children}
        </_SocketContext.Provider>
    );
}

export default SocketContextProvider;