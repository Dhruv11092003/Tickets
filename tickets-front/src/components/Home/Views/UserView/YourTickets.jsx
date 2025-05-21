import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";
import getToken from "../../../CustomHooks/getToken";
import makeToast from "../../../Toast/toast";
import ClipLoader from "react-spinners/ClipLoader";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupComponent from "../../../PopupComponent/PopupComponent";

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
        makeToast("error", `Something Went Wrong ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets(token);
  }, []);

  const resolveTicket = async (ticketId) => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/user/resolveTicket/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Handle success if needed
        window.location.reload();
        makeToast("success", "Ticket resolved successfully.");
      }
    } catch (e) {
      console.error(e.message);
      window.location.reload();
      makeToast("error", `Something went wrong: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const invokeTicket = async (ticketId) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/user/invokeTicket/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Handle success if needed
        window.location.reload();
        makeToast("success", "Ticket resolved successfully.");
      }
    } catch (e) {
      console.error(e.message);
      window.location.reload();
      makeToast("error", `Something went wrong: ${e.message}`);
    }
  };

  return (
    <div>
      <div className="home-heading-container">
        <h1 className="home-heading">Your Tickets</h1>
        <p className="home-para">View your raised tickets below</p>
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
                    <button
                      className="button"
                      style={{
                        backgroundColor: "transparent",
                      }}
                      type="button"
                    >
                      Show Details
                    </button>
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
              {ticket.status === "In Progress" ||
              ticket.status === "Created" ? (
                <PopupComponent
                  trigger={
                    <div>
                      <button type="button" className="button">
                        Resolve Ticket
                      </button>
                    </div>
                  }
                  content={
                    <div>
                      <h4>Do you want to resolve this ticket?</h4>
                      <button
                        type="button"
                        className="button yes-btn"
                        onClick={() => resolveTicket(ticket.ticketId)}
                      >
                        Yes
                      </button>
                    </div>
                  }
                />
              ) : (
                <PopupComponent
                  trigger={
                    <div>
                      <button type="button" className="button">
                        Invoke Ticket
                      </button>
                    </div>
                  }
                  content={
                    <div>
                      <h4>Do you want to invoke this ticket?</h4>{" "}
                      {/* Changed message to match intent */}
                      <button
                        type="button"
                        className="button yes-btn"
                        onClick={() => invokeTicket(ticket.ticketId)}
                      >
                        Yes
                      </button>
                    </div>
                  }
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourTicketsComponent;
