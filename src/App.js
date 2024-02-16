import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          setPosts(data);
          setLoading(false);
        } else {
          setError('Failed');
          setLoading(false);
        }
      };
      xhr.onerror = () => {
        setError('Failed');
        setLoading(false);
      };
      xhr.send();
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setSuccessMessage('Post added successfully!');
        setFormData({ title: '', body: '' });
      } else {
        setError('Failed to add post');
      }
    };
   
    xhr.send(JSON.stringify({
      ...formData,
      userId: 1,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: "flex", gap: "44px", flexWrap: "wrap", width: "90%", margin: "auto" }}>
      <div>
        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            rows="4"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
}

export default App;
