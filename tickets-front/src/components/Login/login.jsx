import "./index.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "js-cookie";
import makeToast from "../Toast/toast";
import { useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DisclaimerModal from "../DisclaimerModal/Disclaimer";
import PopupComponent from "../PopupComponent/PopupComponent";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobile] = useState("");
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("");
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changeNameValue = (e) => {
    setName(e.target.value);
  };

  const changeEmailValue = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordValue = (e) => {
    setPassword(e.target.value);
  };

  const changeMobileValue = (e) => {
    setMobile(e.target.value);
  };

  const changeOrgNameValue = (e) => {
    setOrgName(e.target.value);
  };

  const changeRoleValue = (e) => {
    setRole(e.target.value);
  };

  const changeLogin = () => {
    setLogin((prev) => !prev);
  };

  const sendForLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URI}/user/login`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        Cookies.set("jwtToken", response.data.jwtToken, { expires: 1 });
        navigate("/", { replace: true });
        // setMessage();
        const token = response.data.jwtToken;
        const decoded = jwtDecode(token);

        makeToast(
          "success",
          `Login successful! Welcome ${decoded.name}
           Designation:${decoded.role}
          `
        );
      }
    } catch (error) {
      makeToast(
        "error",
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const sendForSignup = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        password,
        mobile: mobileNo,
        org_name: orgName,
        role,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URI}/user/register`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        makeToast(
          "success",
          ` 
          ${response.data.message}
          `
        );
      } else {
        makeToast(
          "error",
          ` 
          ${response.data.message}
          `
        );
      }
    } catch (e) {
      console.log(e);
      makeToast(
        "error",
        ` 
        ${e.response.data.message}
        `
      );
    }
  };
  const Token = Cookies.get("jwtToken");
  if (Token !== undefined) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <div className="login-background">
          <div className="login-container">
            <div className="login-detail-container">
              <h1 className="ticketwise-heading">Welcome To TicketWise!</h1>
              <p className="ticketwise-Para">
                The bridge to seamless issue handling
              </p>
            </div>
            <div>
              {login ? (
                <div className="form-container">
                  <h1 className="heading-login-signup">Login</h1>
                  <Form onSubmit={sendForLogin} className="login-form">
                    <img
                      src="/ticketwise.png"
                      alt="logo"
                      height={50}
                      width={140}
                      style={{ marginBottom: "20px" }}
                    />
                    <Form.Group className="mb-3 form-item">
                      {/* <Form.Label className="form-label">Email</Form.Label> */}
                      <Form.Control
                        className="input-container"
                        type="email"
                        onChange={changeEmailValue}
                        value={email}
                        placeholder="Enter Email"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      {/* <Form.Label className="form-label">Password</Form.Label> */}
                      <Form.Control
                        className="input-container"
                        type="password"
                        value={password}
                        onChange={changePasswordValue}
                        placeholder="Enter Password"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      <button type="submit" className="login-btn">
                        Login
                      </button>
                    </Form.Group>
                  </Form>
                  <p className="login-signin-para">New to TicketWise!</p>
                  <button
                    type="button"
                    onClick={changeLogin}
                    className="login-btn"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="form-container">
                  <h1 className="heading-login-signup">Register</h1>
                  <Form onSubmit={sendForSignup} className="login-form">
                    <img
                      src="/ticketwise.png"
                      alt="logo"
                      height={50}
                      width={140}
                      style={{ marginBottom: "20px" }}
                    />
                    <Form.Group className="mb-3 form-item">
                      <Form.Control
                        className="input-container"
                        type="text"
                        onChange={changeNameValue}
                        value={name}
                        placeholder="Enter Name"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      <Form.Control
                        className="input-container"
                        type="email"
                        onChange={changeEmailValue}
                        value={email}
                        placeholder="Enter Email"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      <Form.Control
                        className="input-container"
                        type="password"
                        value={password}
                        onChange={changePasswordValue}
                        placeholder="Enter Password"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      <Form.Control
                        className="input-container"
                        type="text"
                        value={mobileNo}
                        onChange={changeMobileValue}
                        placeholder="Enter Mobile"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      <Form.Control
                        className="input-container"
                        type="text"
                        value={orgName}
                        onChange={changeOrgNameValue}
                        placeholder="Enter Organisation Name"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      <Form.Select
                        aria-label="Default select example"
                        value={role}
                        onChange={changeRoleValue}
                        placeholder="Enter Role"
                        className="input-container"
                        required
                      >
                        <option selected>Select Role</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Super-Admin">Super Admin</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 form-item">
                      <button type="submit" className="login-btn">
                        Register
                      </button>
                    </Form.Group>
                  </Form>
                  <p className="login-signin-para">Already! Have an Account</p>
                  <button
                    type="button"
                    className="login-btn"
                    onClick={changeLogin}
                  >
                    Login
                  </button>
                </div>
              )}
              <PopupComponent
                trigger={<center><button type="button" className="login-btn">Current Features</button></center>}
                content={
                  <ul className="ticketwise-features">
                    <h2 style={{marginBottom:"10px"}}>Current Features</h2>
                    <li>
                      🔐 <strong>Role-Based Authentication</strong> – Secure
                      login system with different roles: User, Admin, and Super
                      Admin.
                    </li>
                    <li>
                      📝 <strong>Ticket Raising (User Role)</strong> – Users can
                      create new tickets by providing issue details like title,
                      description, priority, and category.
                    </li>
                    <li>
                      📋 <strong>User Dashboard</strong> – Users can view a list
                      of all the tickets they've raised along with their current
                      statuses.
                    </li>
                    <li>
                      🛠️ <strong>Admin Ticket Management</strong> – Admins can
                      view and manage tickets assigned to them, including
                      updating status and adding responses.
                    </li>
                    <li>
                      🎯 <strong>Super Admin Panel</strong> – Super Admins have
                      full access to all tickets and can assign them to
                      available admins for resolution and also it has control for activating and deactivating user,
                      a user/admin/super-admin after registering can only access the account after a super admin activates it.
                    </li>
                    <li>
                      🗂️ <strong>Ticket Assignment</strong> – Super Admins can
                      manually assign unassigned tickets to admins based on
                      availability or issue type.
                    </li>
                    <li>
                      🧭 <strong>Separate Dashboards for Each Role</strong> –
                      Each user role sees a tailored interface with relevant
                      functionalities and data access.
                    </li>
                    <li>
                      🌐 <strong>Backend Integration</strong> – The React
                      frontend communicates seamlessly with the Node.js/Express
                      backend using API endpoints via environment variables.
                    </li>
                    <li>
                      📱 <strong>Responsive UI</strong> – Optimized design for
                      both desktop and mobile devices using React and modern
                      styling practices.
                    </li>
                    <li>
                      🔄 <strong>Manual Data Refresh</strong> – Ticket updates
                      are reflected upon page refresh or manual fetch (no
                      real-time updates implemented yet).
                    </li>
                    <li>
                      🧩 <strong>Scalable Code Structure</strong> – Clean and
                      modular codebase following best practices, making it easy
                      to scale and maintain.
                    </li>
                    <li>
                      💡 <strong>Built with MERN Stack</strong> – Fully built
                      using MongoDB, Express.js, React, and Node.js — ensuring a
                      robust and modern web application architecture.
                    </li>
                    <li>
                      ✨ <strong>And so on...</strong>
                    </li>
                  </ul>
                }
              />
            </div>
          </div>
          <DisclaimerModal />
        </div>
      </>
    );
  }
};

export default Login;
