import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userID || !password) {
      setErrorMessage('Please enter both userID and password.');
      return;
    }

    try {

    // In case u want to use it on your local host then use the below command. Happy Coding (Hope it helps u too :) )
    //   const response = await axios.post('http://localhost:<port>/api/admin/login', { adminID: userID, password });

      const response = await axios.post('https://form-backend-mfoqqrayq-sharadparmar4142s-projects.vercel.app/api/admin/login', { adminID: userID, password });

      if (response.status === 200) {
        setIsLoggedIn(true); // Set login status to true
      }
      console.log(response.data.userData);
      setUserData(response.data.userData);
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  // Handle register form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userID || !password) {
      setErrorMessage('Please enter both userID and password.');
      return;
    }

    try {
    // In case u want to use it on your local host then use the below command. Happy Coding (Hope it helps u too :)  )
    //   const response = await axios.post('http://localhost:<port>/api/admin/register', { adminID: userID, password });

      const response = await axios.post('https://form-backend-mfoqqrayq-sharadparmar4142s-projects.vercel.app/api/admin/register', { adminID: userID, password });

      if (response.status === 200) {
        setIsLoggedIn(true); // Set login status to true
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        .login-container {
          width: 300px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .input-group input {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .error-message {
          color: red;
          font-size: 12px;
          margin-bottom: 15px;
        }

        .login-button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .login-button:hover {
          background-color: #0056b3;
        }

        .user-item {
          margin-bottom: 20px;
        }

        .user-item p {
          margin: 5px 0;
        }

        .user-item a {
          color: #007bff;
          text-decoration: none;
        }

        .user-item a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container">
        {!isLoggedIn ? (
          // Admin Login Form
          <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="userID">AdminID:</label>
                <input
                  type="text"
                  id="userID"
                  name="userID"
                  value={userID}
                  onChange={(e) => setuserID(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit" className="login-button">Login</button>

              <button onClick={handleRegister} className="login-button" style={{ marginTop: '10px' }}>Register</button>
            </form>
          </div>
        ) : (
          // Admin Dashboard or user data
          <div className="user-list">
            <h2>User Data</h2>
            {userData.length > 0 ? (
              userData.map((user, index) => (
                <div className="user-item" key={index}>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Social ID:</strong> {user.socialID}</p>
                  <div>
                    <strong>Images:</strong>
                    <div>
                      {user.images.map((img, idx) => (
                        <p key={idx}>
                          <a href={img} target="_blank" rel="noopener noreferrer">
                            View Image {idx + 1}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminLogin;
