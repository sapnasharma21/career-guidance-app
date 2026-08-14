import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  // Agar koi seedha /results URL type kar de (bina analysis kiye), wapas upload pe bhej do
  if (!analysis) return <Navigate to="/upload" />;

  const { targetRole, currentSkills, skillGaps, recommendedPaths, learningResources } = analysis;

  return (
    <>
      <Navbar />
      <div className="results-page">
        <div className="results-header">
          <span className="results-eyebrow">Step 2 of 2</span>
          <h1>Your skill map for <em>{targetRole}</em></h1>
        </div>

        <div className="results-grid">
          <section className="results-card">
            <h2>What you already have</h2>
            <ul className="results-list results-list--have">
              {currentSkills?.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>

          <section className="results-card">
            <h2>What's missing</h2>
            <ul className="results-list results-list--gap">
              {skillGaps?.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>

          <section className="results-card">
            <h2>Career paths to consider</h2>
            <ul className="results-list results-list--path">
              {recommendedPaths?.map((path, i) => (
                <li key={i}>{path}</li>
              ))}
            </ul>
          </section>

          <section className="results-card">
            <h2>Where to learn it</h2>
            <ul className="results-list results-list--resource">
              {learningResources?.map((resource, i) => (
                <li key={i}>{resource}</li>
              ))}
            </ul>
          </section>
        </div>

        <button className="results-again" onClick={() => navigate('/upload')}>
          Analyze another resume
        </button>
      </div>
    </>
  );
};

export default Results;