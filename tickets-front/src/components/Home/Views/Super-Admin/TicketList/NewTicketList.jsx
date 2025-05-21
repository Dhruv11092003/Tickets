import axios from "axios";
import "./index.css";
import { useState } from "react";
import Popup from "reactjs-popup";
import makeToast from "../../../../Toast/toast";
import getToken from "../../../../CustomHooks/getToken";
import { jwtDecode } from "jwt-decode";
import "reactjs-popup/dist/index.css";


const TicketList = ({ ticket }) => {
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState("");

  // Fetch Admins only when needed
  const fetchAdmins = async () => {
    if (admins.length > 0) return; // Prevents unnecessary API calls
    try {
      const token = getToken();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/s-admin/getAllAdmins`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setAdmins(response.data.admins);
      }
    } catch (e) {
      console.error(e.message);
      makeToast("error", `Something Went Wrong: ${e.message}`);
    }
  };

  // Handle Admin Assignment
  const handleAssignAdmin = async (e, close) => {
    e.preventDefault();
    console.log(admin)
    if (!admin) return;
    try {
      const token = getToken();
      const details=jwtDecode(token)

      const payload={ ticketId: ticket.ticketId, adminId: admin ,superAdminId:details.user_id}
      
      await axios.post(
        `${process.env.REACT_APP_BASE_URI}/s-admin/assignTicketToAdmin`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      makeToast("success", "Admin assigned successfully!");
      close(); // Close popup after successful assignment
    } catch (e) {
      makeToast("error", `Failed to assign admin: ${e.message}`);
    }
  };

  return (
    <li className="ticket-list-item">
      <div className="ticket-info-container">
        <div>
          <h5>Title</h5>
          <p>{ticket.title}</p>
        </div>
        <div>
          <h5>Status</h5>
          <p>{ticket.status}</p>
        </div>
        <div>
          <h5>Raised by</h5>
          <p>{ticket.raisedBy?.userId}</p>
        </div>
        <div>
          <h5>Organisation Name</h5>
          <p>{ticket.org_name}</p>
        </div>
        <div className="ticket-btn-container">
          {/* Assign Admin Button */}
          <Popup
            trigger={
              <button
                type="button"
                className="assign-btn"
                onClick={fetchAdmins}
              >
                Assign Admin
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <h3>Assign Admin</h3>
                <form
                  className="set-admin-form"
                  onSubmit={(e) => handleAssignAdmin(e, close)}
                >
                  <label>Choose an Admin:</label>
                  <select
                    value={admin}
                    onClick={fetchAdmins}
                    onChange={(e) => setAdmin(e.target.value)}
                  >
                    <option value="">-- Select Admin --</option>
                    {admins.map((adminItem) => (
                      <option key={adminItem.user_id} value={adminItem.user_id}>
                        {adminItem.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="assign-btn" disabled={!admin}>
                    Assign Admin
                  </button>
                  <button type="button" className="button no-btn" onClick={close}>
                    Close
                  </button>
                </form>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </li>
  );
};

export default TicketList;
