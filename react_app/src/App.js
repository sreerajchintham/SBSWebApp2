import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [targetColumn, setTargetColumn] = useState('');
  const [kFeatures, setKFeatures] = useState(3);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const allTextLines = text.split(/\r\n|\n/);
      const headers = allTextLines[0].split(',');
      setColumns(headers);
    };
    reader.readAsText(uploadedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_column', targetColumn);
    formData.append('k_features', kFeatures);

    try {
      const res = await axios.post('http://127.0.0.1:5000/run-sbs', formData);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert('API call failed.');
    }
  };

  const downloadCSV = () => {
    if (!result) return;
    const csvRows = [];

    const headers = Object.keys(result.reduced_dataset[0]);
    csvRows.push(headers.join(','));

    result.reduced_dataset.forEach(row => {
      const values = Object.values(row).join(',');
      csvRows.push(values);
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'reduced_dataset.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-5">
      <h2 className="app-heading">Sequential Backward Selection (SBS)</h2>

      <form className="custom-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label">Upload CSV File</label>
          <input
            className="form-control"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>

        {columns.length > 0 && (
          <>
            <div className="mb-4">
              <label className="form-label">Target Column</label>
              <select
                className="form-select"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                required
              >
                <option value="">Select target column</option>
                {columns.map((col, idx) => (
                  <option key={idx} value={col}>{col}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Number of Features to Keep (k)</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max={columns.length - 1}
                value={kFeatures}
                onChange={(e) =>
                  setKFeatures(Math.min(columns.length - 1, parseInt(e.target.value)))
                }
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="custom-button">Run SBS</button>
      </form>

      {result && (
        <div className="mt-5">
          <h4 className="section-heading">Selected Features</h4>
          <ul>
            {result.selected_features.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>

          <h4 className="section-heading">Reduced Dataset Preview</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {Object.keys(result.reduced_dataset[0]).map((col, i) => (
                    <th key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.reduced_dataset.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="custom-button mt-3" onClick={downloadCSV}>
            Download Reduced Dataset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
