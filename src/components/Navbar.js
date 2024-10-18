import React from 'react';

function NAVBAR() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}><a href="/" style={styles.navLink}>Home</a></li>
        <li style={styles.navItem}><a href="/bus" style={styles.navLink}>Bus</a></li>
        <li style={styles.navItem}><a href="/booking" style={styles.navLink}>Booking</a></li>
        <li style={styles.navItem}><a href="/list" style={styles.navLink}>List</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '1rem',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
  },
  navItem: {
    display: 'inline',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default NAVBAR;
