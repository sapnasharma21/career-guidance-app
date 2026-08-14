import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get('/analysis/history');
        setHistory(data);
      } catch (err) {
        setError('Could not load your history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div className="dashboard-header">
          <span className="dashboard-eyebrow">Your history</span>
          <h1>Past analyses</h1>
          <button className="dashboard-new" onClick={() => navigate('/upload')}>
            + New analysis
          </button>
        </div>

        {loading && <p className="dashboard-status">Loading…</p>}
        {error && <p className="dashboard-status dashboard-status--error">{error}</p>}

        {!loading && !error && history.length === 0 && (
          <div className="dashboard-empty">
            <p>You haven't analyzed a resume yet.</p>
            <button onClick={() => navigate('/upload')}>Analyze your first resume</button>
          </div>
        )}

        <div className="dashboard-list">
          {history.map((item) => (
            <div key={item._id} className="dashboard-card">
              <div className="dashboard-card__top">
                <h3>{item.targetRole}</h3>
                <span className="dashboard-card__date">{formatDate(item.createdAt)}</span>
              </div>
              <p className="dashboard-card__meta">
                {item.currentSkills?.length || 0} skills matched · {item.skillGaps?.length || 0} gaps found
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;