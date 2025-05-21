import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import getToken from "../../../CustomHooks/getToken";
import axios from "axios";
import makeToast from "../../../Toast/toast";
import "./index.css";
import getformatDateOrDaysAgo from "./../../../CustomHooks/getDate";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = getToken();
        const details = jwtDecode(token);
        const payload = {
          userId: details.user_id,
        };
        setRole(details.role);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URI}/user/getSingleUserDetails`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response) {
          const sortedMessages = [...response.data.messages].sort(
            (a, b) => new Date(b.Date) - new Date(a.Date)
          );
          setMessages(sortedMessages);
        }
      } catch (e) {
        makeToast("error", "Error Fetching Messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []); 

  return (
    <div>
      <h1 className="messages-header">Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <div>
          <p>No messages yet</p>
        </div>
      ) : (
        <ul className="message-container">
          {messages.map((message, index) => (
            <li key={index} className="message-item">
              <div className="message-item-header">
                <h5>{message.title}</h5>
                <p>{getformatDateOrDaysAgo(message.Date)}</p>
              </div>
              {role === "Admin" && (
                <div>
                  <p>
                    {message.description.split(",")[0].split(":")[0]}:{" "}
                    {message.description.split(",")[0].split(":")[1]}
                  </p>
                  <p>
                    {message.description.split(",")[1].split("{")[0]}{" "}
                    {message.description.split(",")[1].split("{")[1]}
                  </p>
                </div>
              )}
              {role === "User" && (
                <div>
                  <p>{message.description}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
