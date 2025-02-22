import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.css";
import makeToast from "../../../../Toast/toast";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const UserListItem = (props) => {
  const { userItem } = props;
  const [Loading, setLoading] = useState(false);
  const token = Cookies.get("jwtToken");
  const [extendContainer, setExtendContainer] = useState(false);
  const {
    name,
    user_id,
    role,
    status,
    org_name,
    email,
    mobile,
    createdAt,
    updatedAt,
  } = userItem;

  const disableUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/s-admin/disableUser/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        makeToast("success", `User Disabled Successfully `);
        // window.location.reload();
      }
    } catch (e) {
      makeToast("error", `Failed to Disable User, ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const enableUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/s-admin/activateUser/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        makeToast("success", `User Activated Successfully `);
        // window.location.reload();
      }
    } catch (e) {
      makeToast("error", `Failed to Activate User, ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return Loading ? (
    <ClipLoader color={"#0083e1e3"} loading={Loading} size={50} />
  ) : (
    <li className="user-list-item" key={user_id}>
      <div>
        <h5>User Id</h5>
        <p>{user_id}</p>
      </div>
      <div className="user-detail-container">
        <div>
          <h5>Name:</h5>
          <p>{name}</p>
        </div>
        <div>
          <h5>Role:</h5>
          <p>{role}</p>
        </div>

        <div>
          <h5>Status</h5>
          <p>{status}</p>
        </div>
      </div>
      <div className="user-item-btn-container">
        {status === "Active" ? (
          <button
            className="active_disable_btn"
            style={{ color: "white", backgroundColor: "red" }}
            onClick={() => disableUser(user_id)}
          >
            Disable
          </button>
        ) : (
          <button
            className="active_disable_btn"
            style={{ color: "white", backgroundColor: "#56e602e3" }}
            onClick={() => enableUser(user_id)}
          >
            Activate
          </button>
        )}
        <button
          className="more-details-btn"
          onClick={() => setExtendContainer(!extendContainer)}
        >
          {extendContainer ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </button>
      </div>
      <div
        className="extend-details-container"
        style={extendContainer ? { display: "flex" } : { display: "none" }}
      >
        <div>
          <h5>Email :</h5>
          <p>{email}</p>
        </div>
        <div>
          <h5>Phone :</h5>
          <p>{mobile}</p>
        </div>
        <div>
          <h5>Organisation</h5>
          <p>{org_name}</p>
        </div>
        <div>
          <h5>Created At</h5>
          <p>{createdAt || null}</p>
        </div>
        <div>
          <h5>Updated At</h5>
          <p>{updatedAt}</p>
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
