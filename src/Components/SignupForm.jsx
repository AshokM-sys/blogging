import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error handling state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Clear form fields and show success message
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setSuccessMessage("Signup successful!");
      setError(""); // Clear any previous errors

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/login"); // Navigate to the login page
      }, 2000); // Delay the redirect to allow the success message to be visible
    } catch (err) {
      // More detailed logging of the error response
      if (err.response) {
        console.error("Error Response:", err.response);
        setError(err.response.data.error || "Error during signup");
      } else if (err.request) {
        // Request was made but no response received
        console.error("Error Request:", err.request);
        setError("No response from the server.");
      } else {
        // Error during setup
        console.error("Error Message:", err.message);
        setError("Error during signup, please try again later.");
      }
    }
  };
  
  return (
    <div style={{marginTop: '150px'}} className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-danger ">Signup</h3>
          </div>
          <div className="card-body">
            <form action="POST" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  className="form-control m-1"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control m-1"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control m-1"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-success mt-2 float-end btn-sm" type="submit">
                Sign Up
              </button>
              <p className='px-1'>Already have an Account. <Link to='/Login'>Login</Link> Here</p>
            </form>

            {/* Success and Error Messages */}
            {successMessage && <p className="text-success">{successMessage}</p>}
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;
