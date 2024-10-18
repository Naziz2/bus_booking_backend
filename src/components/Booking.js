import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [busList, setBusList] = useState([]);
  const [selectedBus, setSelectedBus] = useState('');

  const seats = [
    '1A', '1B', '1C', '1D',
    '2A', '2B', '2C', '2D',
    '3A', '3B', '3C', '3D',
    '4A', '4B', '4C', '4D',
  ];

  // Fetch bus list from the server when the component mounts
  useEffect(() => {
    const fetchBusList = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/buses');
        console.log('Fetched Buses:', response.data);
        setBusList(response.data.buses);
        if (response.data.buses.length > 0) {
          setSelectedBus(response.data.buses[0].bus_name);
        }
      } catch (error) {
        console.error('Error fetching bus list:', error.response ? error.response.data : error.message);
      }
    };

    fetchBusList();
  }, []);

  // Function to fetch booked seats for the selected bus
  const fetchBookedSeats = async () => {
    if (selectedBus) {
      try {
        const response = await axios.get(`http://localhost:5000/api/bus/${selectedBus}`);
        console.log('Booked Seats:', response.data.bookedSeats);
        setBookedSeats(response.data.bookedSeats || []);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    }
  };

  // Fetch booked seats whenever the selected bus changes
  useEffect(() => {
    fetchBookedSeats();
  }, [selectedBus]);

  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(selected => selected !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    try {
      await axios.post('http://localhost:5000/api/book', {
        busName: selectedBus,
        selectedSeats,
      });
      alert(`You have booked the following seats on ${selectedBus}: ${selectedSeats.join(', ')}`);
      setSelectedSeats([]);
      // Re-fetch booked seats to refresh the seat map instantly
      fetchBookedSeats();
    } catch (error) {
      console.error('Error booking seats:', error);
      alert('Error booking seats: ' + error.response.data);
    }
  };
//aziz
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bus Seat Booking</h1>

      <div style={styles.selectContainer}>
        <label htmlFor="busSelect" style={styles.label}>Select Bus:</label>
        <select
          id="busSelect"
          value={selectedBus}
          onChange={(e) => setSelectedBus(e.target.value)}
          style={styles.select}
        >
          {busList.map((bus, index) => (
            <option key={index} value={bus.bus_name}>{bus.bus_name}</option>
          ))}
        </select>
      </div>

      <div style={styles.seatMap}>
        {seats.map((seat) => (
          <div
            key={seat}
            style={{
              ...styles.seat,
              backgroundColor: bookedSeats.includes(seat) 
                ? '#FF6347' // Red for booked seats
                : selectedSeats.includes(seat) 
                  ? '#4CAF50' // Green for selected seats
                  : '#ccc', // Grey for available seats
              cursor: bookedSeats.includes(seat) ? 'not-allowed' : 'pointer', // Disable cursor for booked seats
            }}
            onClick={() => !bookedSeats.includes(seat) && toggleSeatSelection(seat)}
          >
            {seat}
          </div>
        ))}
      </div>


      <button
        style={styles.button}
        onClick={handleBooking}
        disabled={selectedSeats.length === 0}
      >
        Confirm Booking
      </button>
    </div>
  );
}

// Styles
const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  selectContainer: {
    marginBottom: '1.5rem',
  },
  label: {
    fontSize: '1.2rem',
    marginRight: '1rem',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  seatMap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 50px)',
    gap: '40px',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  seat: {
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
export default BookingPage;
