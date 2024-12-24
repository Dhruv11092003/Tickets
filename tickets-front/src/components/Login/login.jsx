import "./index.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobile] = useState("");
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("");

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

  const sendForLogin = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const sendForSignup = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(role);
  };

  return (
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
                <Form.Group className="mb-3 form-item">
                  {/* <Form.Label className="form-label">Email</Form.Label> */}
                  <Form.Control
                    className="input-container"
                    type="email"
                    onChange={changeEmailValue}
                    value={email}
                    placeholder="Enter Email"
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
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-item">
                  <button type="submit" className="login-btn" >Login</button>
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
                <Form.Group className="mb-3 form-item">

                  <Form.Control
                  className="input-container"
                    type="email"
                    onChange={changeNameValue}
                    value={name}
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-item">

                  <Form.Control
                  className="input-container"
                    type="email"
                    onChange={changeEmailValue}
                    value={email}
                    placeholder="Enter Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-item">
          
                  <Form.Control
                  className="input-container"
                    type="password"
                    value={password}
                    onChange={changePasswordValue}
                    placeholder="Enter Password"
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-item">
             
                  <Form.Control
                  className="input-container"
                    type="text"
                    value={mobileNo}
                    onChange={changeMobileValue}
                    placeholder="Enter Mobile"
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-item">
                 
                  <Form.Control
                  className="input-container"
                    type="text"
                    value={orgName}
                    onChange={changeOrgNameValue}
                    placeholder="Enter Organisation Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-item">

                  <Form.Select
                    aria-label="Default select example"
                    value={role}
                    onChange={changeRoleValue}
                    placeholder="Enter Role"
                    className="input-container"
                  >
                    <option selected >Select Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Super-Admin">Super Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 form-item">
                <button type="submit" className="login-btn" >Register</button>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
