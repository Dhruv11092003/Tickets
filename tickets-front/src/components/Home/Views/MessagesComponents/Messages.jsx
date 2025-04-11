import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import getToken from "../../../CustomHooks/getToken";
import PopupComponent from "../../../PopupComponent/PopupComponent";
const Messages=()=>{
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const token=getToken()
    const details=jwtDecode(token)
    console.log(details)
    
    return(
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message, index) => (
                <li>
                    <h5>{message.title}</h5>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Messages;