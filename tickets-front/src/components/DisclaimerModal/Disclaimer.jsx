import React, { useState } from "react";
import "./DisclaimerModal.css";

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">🚧 App Disclaimer</h2>

        <p className="modal-paragraph">
          This app is currently in active development. Upcoming features include:
        </p>

        <ul className="modal-list">
          <li>Dashboard</li>
          <li>Admin reassignment</li>
          <li>Changing account credentials</li>
          <li>Bug fixes</li>
          <li>Loader animations</li>
          <li>Meeting setup functionality</li>
          <p>and many more....</p>
        </ul>

        <p className="modal-paragraph">
          I, <strong>Dhruv Kulshrestha</strong>, as the sole developer, assure you that every time you visit, you'll see new improvements. Please don’t judge my skills solely based on this app's current version. 🙏
        </p>

        <div className="credentials-box">
          <h3 className="credentials-title">🔐 Test Credentials</h3>
          <ul className="credentials-list">
            <li>
              <strong>User:</strong><br />
              Username: <code>user@gmail.com</code><br />
              Password: <code>shubham@12</code>
            </li>
            <li>
              <strong>Admin:</strong><br />
              Username: <code>admin@gmail.com</code><br />
              Password: <code>shubham@12</code>
            </li>
            <li>
              <strong>Super Admin:</strong><br />
              Username: <code>dhruv11@gmail.com</code><br />
              Password: <code>shubham@12</code>
            </li>
          </ul>
        </div>

        <center>
            
        <button className="modal-button" onClick={closeModal}>
          Got it!
        </button>
        <p className="modal-paragraph">If closed! Reload the page watch this again</p>
        </center>
      </div>
    </div>
  );
};

export default DisclaimerModal;
