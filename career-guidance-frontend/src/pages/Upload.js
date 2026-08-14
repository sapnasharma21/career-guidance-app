import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import './Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please select a resume file (PDF or DOCX)');
      return;
    }
    if (!targetRole.trim()) {
      setError('Please enter a target role');
      return;
    }

    setLoading(true);
    try {
      // Step 1: resume upload karo
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('targetRole', targetRole);

      const uploadRes = await API.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Step 2: usi resume ko analyze karo
      const analyzeRes = await API.post('/analysis/analyze', {
        resumeId: uploadRes.data._id,
        targetRole,
      });

      // Step 3: results page pe le jao, analysis data ke saath
      navigate('/results', { state: { analysis: analyzeRes.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-page">
        <div className="upload-card">
          <span className="upload-eyebrow">Step 1 of 2</span>
          <h1>Upload your resume</h1>
          <p className="upload-sub">
            PDF or DOCX, under 5MB. Tell us the role you're aiming for
            and we'll map the gap.
          </p>

          <form onSubmit={handleSubmit} className="upload-form">
            <label className="upload-dropzone">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                hidden
              />
              <span className="upload-dropzone__icon">↑</span>
              <span className="upload-dropzone__text">
                {fileName || 'Click to choose a file'}
              </span>
            </label>

            <label className="upload-field">
              Target role
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Data Analyst"
              />
            </label>

            {error && <p className="upload-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? 'Analyzing your resume…' : 'Analyze my resume'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;