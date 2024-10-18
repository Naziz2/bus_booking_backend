import React from 'react';

function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Our Bus Booking Service</h1>
      <p style={styles.text}>
        Looking for the best travel deals? You're in the right place! Our service offers amazing discounts and promotions for various bus routes across the country. Whether you're planning a short trip or a long journey, we have the perfect offers to make your travel affordable and enjoyable.
      </p>
      <p style={styles.text}>
        Here’s what we’re currently offering:
      </p>
      <ul style={styles.offerList}>
        <li>🚌 20% off on all weekend bookings!</li>
        <li>🕒 Book early and save an additional 10% on select routes.</li>
        <li>🎟️ Group discounts for bookings of 4 or more passengers.</li>
        <li>💺 Free seat upgrades for first-time users.</li>
      </ul>
      <p style={styles.text}>
        Don't miss out! Explore our booking options and enjoy a comfortable and budget-friendly ride.
      </p>
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
    color: '#333',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '1.5rem',
  },
  offerList: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '1.2rem',
  },
};

export default HomePage;
