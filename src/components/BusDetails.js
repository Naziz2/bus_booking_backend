import React, { useState } from 'react';

function BusPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    if (from && to) {
      setMessage(`Searching buses from ${from} to ${to}...`);
    } else {
      setMessage('Please select both "From" and "To" locations.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Find Your Bus</h1>

      <div style={styles.formGroup}>
        <label style={styles.label}>From:</label>
        <select style={styles.select} value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="">Select Location</option>
          <option value="Tunis">Tunis</option>
          <option value="Sfax">Sfax</option>
          <option value="Sousse">Sousse</option>
          <option value="Gabès">Gabès</option>
          <option value="Bizerte">Bizerte</option>
          <option value="Kairouan">Kairouan</option>
          <option value="Gafsa">Gafsa</option>
          <option value="Monastir">Monastir</option>
          <option value="Djerba">Djerba</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>To:</label>
        <select style={styles.select} value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">Select Destination</option>
          <option value="Tunis">Tunis</option>
          <option value="Sfax">Sfax</option>
          <option value="Sousse">Sousse</option>
          <option value="Gabès">Gabès</option>
          <option value="Bizerte">Bizerte</option>
          <option value="Kairouan">Kairouan</option>
          <option value="Gafsa">Gafsa</option>
          <option value="Monastir">Monastir</option>
          <option value="Djerba">Djerba</option>
        </select>
      </div>

      <button style={styles.button} onClick={handleSearch}>
        Search
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    fontSize: '1.2rem',
    marginRight: '1rem',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    width: '200px',
  },
  button: {
    padding: '0.7rem 1.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  message: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#333',
  }
};

export default BusPage;
