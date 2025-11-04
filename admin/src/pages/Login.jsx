import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });

      localStorage.setItem('token', res.data.token);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => (window.location.href = '/home'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '12px 0',
      borderRadius: '6px',
      border: '1px solid #444',
      backgroundColor: '#2b2b2b',
      color: '#fff',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff8800',
      border: 'none',
      color: '#fff',
      fontWeight: 'bold',
      cursor: loading ? 'not-allowed' : 'pointer',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: '0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#ff6b00',
    },
    error: { color: '#ff6b6b', marginTop: '10px' },
    success: { color: '#00ff88', marginTop: '10px' },
    title: { marginBottom: '20px' },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={styles.button}
          disabled={loading}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#ff6b00')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#ff8800')}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
}
