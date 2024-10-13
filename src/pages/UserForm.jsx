import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [username, setName] = useState('');
  const [socialID, setSocialMedia] = useState('');
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files); // Convert FileList to Array
    setImages((prevImages) => [...prevImages, ...newImages]); // Append new images to the existing state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('socialID', socialID);

    // Append each image file to formData
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const res = await axios.post('https://form-backend-tau.vercel.app/api/user/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      // Show success message
      setSuccessMessage('Images added successfully!');

      // Clear the form
      setName('');
      setSocialMedia('');
      setImages([]); // Clear images after submission

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setSuccessMessage('Error adding images. Please try again.'); // Set error message if needed
    }
  };

  // Function to render image previews
  const renderImagePreviews = () => {
    return images.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)} // Create a temporary URL for the image
        alt={`preview-${index}`}
        style={{ width: '100px', height: '100px', margin: '5px' }} // Style the previews
      />
    ));
  };

  return (
    <>
      <style>{`
        .form-container {
          width: 90%;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: bold;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .form-group input[type="file"] {
          padding: 5px;
        }

        .submit-button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .submit-button:hover {
          background-color: #0056b3;
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
          .form-container {
            padding: 15px;
          }

          .form-container h2 {
            font-size: 20px;
          }

          .form-group label {
            font-size: 14px;
          }

          .form-group input {
            padding: 8px;
            font-size: 13px;
          }

          .submit-button {
            padding: 8px;
            font-size: 14px;
          }
        }

        .image-preview {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .success-message {
          color: green;
          font-weight: bold;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>

      <div className="form-container">
        <h2>User Submission Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Social Media Handle:</label>
            <input
              type="text"
              value={socialID}
              onChange={(e) => setSocialMedia(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Images:</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*" // Optional: Limit file types to images only
            />
          </div>

          <div className="image-preview">
            {renderImagePreviews()} {/* Render the image previews */}
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>

        {successMessage && ( // Conditionally render the success message
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </>
  );
}

export default UserForm;
