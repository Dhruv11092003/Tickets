import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import TicketList from "./TicketList/TicketList";
import makeToast from "../../../Toast/toast";
import ClipLoader from "react-spinners/ClipLoader";

const AssignTickets = () => {
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
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
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/s-admin/getAllAdmins`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setAdmins(response.data.admins)
        }
      } catch (e) {
        console.error(e.message);
        makeToast("error", `Something Went Wrong ${e}`);
      }
    };
    fetchTickets(token);
    fetchAdmins(token);
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
        <ul className="assign-ticket-container">
          {tickets.map((ticket) => (
            <TicketList key={ticket._id} ticket={ticket} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignTickets;
