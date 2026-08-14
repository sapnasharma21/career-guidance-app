import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="compass">
          <svg viewBox="0 0 200 200" className="compass-svg">
            <circle cx="100" cy="100" r="90" className="compass-ring" />
            <circle cx="100" cy="100" r="62" className="compass-ring compass-ring--inner" />
            <g className="compass-needle">
              <line x1="100" y1="100" x2="100" y2="24" />
              <circle cx="100" cy="24" r="5" className="compass-point" />
            </g>
            <circle cx="100" cy="100" r="4" className="compass-center" />
          </svg>
        </div>
        <h1 className="auth-panel__title">Welcome<br/>back.</h1>
        <p className="auth-panel__copy">
          Pick up where you left off — your skill map and
          recommendations are waiting.
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <span className="auth-eyebrow">Welcome back</span>
          <h2>Log in to your account</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                required
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;