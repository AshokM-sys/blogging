import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // For redirecting

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage('');  // Clear any previous success message
    setError('');  // Clear any previous errors

    // Form Validation
    if (!formData.username || !formData.password) {
      setError('Both username and password are required!');
      return;
    }

    setLoading(true);  // Start loading

    try {
      const response = await axios.post('http://localhost:5000/login', formData);

      // Check if token is returned
      if (response.data.token) {
        // Store the token (usually in localStorage or cookies)
        localStorage.setItem('token', response.data.token);

        // Set success message and clear error message
        setSuccessMessage('Login successful!');

        // Redirect to the dashboard after a short delay
        navigate('/dashboard');
      }
    } catch (err) {
      setSuccessMessage(''); // Clear success message in case of error
      setError(err.response?.data?.error || 'Error during login, please try again');
    } finally {
      setLoading(false);  // Stop loading once the request is finished
    }
  };

  return (
    <>
    <div style={{marginTop: '150px'}} className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <h3 className="text text-danger">Login</h3>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}  // Disable input when loading
              />
            </div>
            <div className="form-group p-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}  // Disable input when loading
              />
            </div>
            <button className="btn btn-success mt-2 float-end btn-sm" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Submit'}
            </button>
            <p className="px-1">
              I don't have an Account. <Link to="/SignupForm">Signup</Link> Here
            </p>
          </form>

          {successMessage && <p className="text-success">{successMessage}</p>}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Login;
