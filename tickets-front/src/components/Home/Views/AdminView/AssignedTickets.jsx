import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";
import getToken from "../../../CustomHooks/getToken";
import makeToast from "../../../Toast/toast";
import ClipLoader from "react-spinners/ClipLoader";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AssignedTickets = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = getToken();
    const fetchTickets = async (token) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/admin/getAssignedTickets`,
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
      {/*Styling is used directly from the UserView index.css file*/}
      <div className="home-heading-container">
        <h1 className="home-heading">Assigned Tickets</h1>
        <p className="home-para">View Tickets Assigned to you below</p>
      </div>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color={"#0083e1e3"} loading={loading} size={50} />
        </div>
      ) : (
        <ul className="user-ticket-container">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="ticket-item">
              <div>
                <h5>Ticket Id</h5>
                <p>{ticket.ticketId}</p>
              </div>
              <div className="desc-title-container">
                <h5>Title</h5>
                <p>{ticket.title}</p>
              </div>
              <div className="desc-title-container">
                <h5>Description</h5>
                <p>{ticket.description.substr(0, 50)}</p>
              </div>
              <div>
                <h5>Status</h5>
                <p>{ticket.status}</p>
              </div>
              <div>
                <Popup
                  trigger={
                    <h5
                      style={{
                        borderBottom: "1px solid #0004ff",
                        color: "#0004ff",
                        cursor: "pointer",
                      }}
                    >
                      Show Details
                    </h5>
                  }
                  className="popup-content"
                  modal
                >
                  {(close) => (
                    <div className="ticket-modal">
                      <div className="modal-header">
                        <h3>Ticket Details</h3>
                        <button
                          type="button"
                          className="close-btn"
                          onClick={close}
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-content">
                        <div className="modal-field">
                          <strong>Ticket ID:</strong>
                          <p>{ticket.ticketId}</p>
                        </div>
                        <div className="modal-field">
                          <strong>Title:</strong>
                          <p>{ticket.title}</p>
                        </div>
                        <div className="modal-field">
                          <strong>Description:</strong>
                          <p
                            style={{
                              width: "60%",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              margin: 0,
                            }}
                          >
                            {ticket.description}
                          </p>
                        </div>
                        <div className="modal-field">
                          <strong>Raised By (User ID):</strong>
                          <p>{ticket.raisedBy.userId}</p>
                        </div>
                        <div className="modal-field">
                          <strong>Assigned To:</strong>
                          <p>{ticket.assignedTo?.name || "Not Assigned"}</p>
                        </div>
                        <div className="modal-field">
                          <strong>Organization:</strong> {ticket.org_name}
                        </div>
                        <div className="modal-field">
                          <strong>Attachments:</strong>
                          <a
                            href={ticket.attachments[0]?.fileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ticket.attachments[0]?.fileName}
                          </a>
                        </div>
                        <div className="modal-field">
                          <strong>Created At:</strong>
                          <p>{new Date(ticket.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="modal-field">
                          <strong>Last Updated:</strong>
                          <p>{new Date(ticket.updatedAt).toLocaleString()}</p>
                        </div>
                        <div style={{width:"100%",display:"flex", flexDirection:"row",justifyContent:"center"}}>
                          <button type="button" className="timeline-step" style={{backgroundColor:"darkblue",color:"white"}}>
                            Schedule a Meeting
                          </button>
                        </div>
                        {/* Timeline Status */}
                        <div className="timeline-container">
                          <h4>Ticket Status Timeline</h4>
                          <div className="timeline">
                            <div
                              className={`timeline-step ${
                                ticket.status === "Created" ||
                                ticket.status === "In Progress" ||
                                ticket.status === "Resolved"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Created
                            </div>
                            <div
                              className={`timeline-step ${
                                ticket.status === "In Progress" ||
                                ticket.status === "Resolved"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              In Progress
                            </div>
                            <div
                              className={`timeline-step ${
                                ticket.status === "Resolved" ? "active" : ""
                              }`}
                            >
                              Resolved
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignedTickets;
