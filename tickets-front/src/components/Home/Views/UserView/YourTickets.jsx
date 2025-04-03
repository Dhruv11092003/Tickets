import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";
import getToken from "../../../CustomHooks/getToken";
import makeToast from "../../../Toast/toast";
import ClipLoader from "react-spinners/ClipLoader";

const YourTicketsComponent = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = getToken();
    const fetchTickets = async (token) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/user/getAllTicketsOfUser`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setTickets(response.data.tickets);
        }
      } catch (e) {
        console.error(e.message);
        makeToast("error", `Something Went Wrong ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets(token);
  }, []);

  return (
    <div className="home-container-view">
      <div className="home-heading-container">
        <h1 className="home-heading">Your Tickets</h1>
        <p className="home-para">View your raised tickets below</p>
      </div>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color={"#0083e1e3"} loading={loading} size={50} />
        </div>
      ) : (
        <ul className="assign-ticket-container">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="ticket-item">
              <h2>{ticket.title}</h2>
              <p>{ticket.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourTicketsComponent;
