import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";
import getToken from "../../../CustomHooks/getToken";
import TicketList from "./TicketList/NewTicketList";
import InProgessTicketList from "./TicketList/InProgressTicketList";
import makeToast from "../../../Toast/toast";
import ClipLoader from "react-spinners/ClipLoader";
import ResolvedTicketList from "./TicketList/ResolvedTickets";

const AssignTickets = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = getToken()
    const fetchTickets = async (token) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/s-admin/getAllTickets`,
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
    <div>
      <div className="home-heading-container">
        <h1 className="home-heading">Assign Tickets</h1>
        <p className="home-para">Assign Tickets To Admin For Resolution</p>
      </div>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color={"#0083e1e3"} loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <h1 className="ticket-type-heading">New Tickets</h1>
        <ul className="assign-ticket-container">
          {tickets.map((ticket) => (
          (ticket.status==="Created") &&
            <TicketList key={ticket._id} ticket={ticket} />
          ))}
        </ul>
        <h1 className="ticket-type-heading">In Progress</h1>
        <ul className="assign-ticket-container">
          {tickets.map((ticket) => (
          (ticket.status==="In Progress") &&
            <InProgessTicketList key={ticket._id} ticket={ticket} />
          ))}
        </ul>
        <h1 className="ticket-type-heading">Resolved</h1>
        <ul className="assign-ticket-container">
          {tickets.map((ticket) => (
          (ticket.status==="Resolved") &&
            <ResolvedTicketList key={ticket._id} ticket={ticket} />
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default AssignTickets;
