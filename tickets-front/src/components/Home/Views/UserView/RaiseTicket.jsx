import "./index.css"
import React, { useState } from 'react';
import getToken from '../../../CustomHooks/getToken';
import ClipLoader from 'react-spinners/ClipLoader';
import makeToast from '../../../Toast/toast'

const RaiseTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [loading, setLoading] = useState(false);
  const token = getToken();

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const payload = {
          title,
          description,
          attachments: {
              fileName,
              fileLink,
          },
      };

      try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URI}/user/raiseTicket`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
          });

          if (response.ok) {
              makeToast('success', 'Ticket raised successfully!');
              setTitle('');
              setDescription('');
              setFileName('');
              setFileLink('');
          } else {
              makeToast('error', 'Failed to raise ticket');
          }
      } catch (error) {
          console.error('Error:', error);
          makeToast('error', 'An error occurred');
      } finally {
          setLoading(false);
      }
  };
  return (
    <div >
    <div className="home-heading-container">
      <h1 className="home-heading">Raise Ticket</h1>
      <p className="home-para">Raise Ticket for Your Issues</p>
    </div>
    <div className="ticket-form-container" >
    <form onSubmit={handleSubmit} className="ticket-form">
            <h2><center>Raise a Ticket</center></h2>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="form-input" 
                required
            />
            <textarea 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="form-textarea" 
                required
            />
            <input 
                type="text" 
                placeholder="File Name" 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)} 
                className="form-input" 
                required
            />
            <input 
                type="text" 
                placeholder="File Link" 
                value={fileLink} 
                onChange={(e) => setFileLink(e.target.value)} 
                className="form-input" 
                required
            />
            {loading && (
                <div className="loader-container">
                    <ClipLoader color={'#0083e1e3'} loading={loading} size={50} />
                </div>
            )}
            <button 
                type="submit" 
                className="form-button">
                Submit
            </button>
        </form>
        </div>
</div>
  );
};

export default RaiseTicket;
