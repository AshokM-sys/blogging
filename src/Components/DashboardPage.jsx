import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT auth
        },
      });

      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error("Unexpected response structure", response.data);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await axios.post(`http://localhost:5000/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage(response.data.successMessage);
      setTitle("");
      setContent("");
      setImage(null);
      fetchPosts(); // Refresh posts after successful submission
    } catch (error) {
      setMessage("Error creating post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ marginTop: "80px" }} className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <h3>Create New Post</h3>
              </div>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group m-2">
                  <label>Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    placeholder="write your title here....."
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group m-2">
                  <label>Content:</label>
                  <textarea
                    className="form-control"
                    value={content}
                    placeholder="write your content here....."
                    rows={3}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group m-2">
                  <label>Image:</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary float-end mt-2">
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <h2>All Posts</h2>
<table className="table table-bordered table-hover table-striped">
  <thead className="thead-dark">
    <tr>
      <th>Title</th>
      <th>Content</th>
      <th>Image</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(posts) && posts.length > 0 ? (
      posts.map((post) => (
        <tr key={post.id}>
          <td>{post.title}</td>
          <td>{post.content}</td>
          <td>
            {post.image && (
              <img
                src={`/${post.image}`} // Assuming image path is public and stored in 'uploads'
                alt={post.title}
                className="img-thumbnail"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                }}
              />
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="text-center">
          <div className="alert alert-warning">No posts available</div>
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default DashboardPage;
