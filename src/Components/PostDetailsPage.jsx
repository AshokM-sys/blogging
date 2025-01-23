import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetailPage() {
  const { id } = useParams(); // Extract post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data); // Set the post details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // Fetch the post when the ID changes (on page load)

  return (
    <div style={{ marginTop: "80px" }} className="container">
      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        <div>
          <h2>{post.title}</h2>
          {post.image && (
            <img
              src={`http://localhost:5000/${post.image}`}
              alt={post.title}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />
          )}
          <p>{post.content}</p>
        </div>
      ) : (
        <p>Post not found!</p>
      )}
    </div>
  );
}

export default PostDetailPage;
