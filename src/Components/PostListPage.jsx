import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allposts");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ marginTop: "80px" }} className="container">
      <h2>All Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div
              className="post-item"
              key={post.id}
              style={{
                display: "flex",
                marginBottom: "30px",
                padding: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                alignItems: "center",
              }}
            >
              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt={post.title}
                  style={{
                    width: "200px",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "20px",
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.5rem", color: "#333", marginBottom: "10px" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "1rem", color: "#555" }}>
                  {post.content.length > 150
                    ? post.content.substring(0, 150) + "..."
                    : post.content}
                </p>

                {/* Link to view the full post */}
                <Link
                  to={`/post/${post.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostListPage;
