import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";

function PostEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get post ID from URL params
  const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdatePost = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      history.push("/dashboard"); // Redirect to Dashboard after update
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      )}
    </div>
  );
}

export default PostEditPage;
