const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Create the Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Allows us to handle JSON requests
app.use(cors()); // Enables CORS

// Replace with your actual MongoDB connection string
const mongoURI = 'mongodb+srv://aziz:farouk1234@bus.b8hib.mongodb.net/bus_booking'; // Include the database name after the slash (/)

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Bus Schema
const busSchema = new mongoose.Schema({
  bus_name: String,
  from: String,
  to: String,
  bookedSeats: [String], // Array to store booked seat numbers
});

// Create Bus model
const Bus = mongoose.model('Bus', busSchema);

// API route to get all buses
app.get('/api/buses', async (req, res) => {
  try {
    const buses = await Bus.find(); // Fetch all buses from the database
    res.json({ buses });
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API route to book seats on a specific bus
app.post('/api/book', async (req, res) => {
  const { busName, selectedSeats } = req.body;
  try {
    const bus = await Bus.findOne({ bus_name: busName });
    if (!bus) {
      return res.status(404).send('Bus not found');
    }

    // Ensure selected seats aren't already booked
    const alreadyBooked = selectedSeats.some(seat => bus.bookedSeats.includes(seat));
    if (alreadyBooked) {
      return res.status(400).send('Some seats are already booked');
    }

    // Add new booked seats to the bus
    bus.bookedSeats.push(...selectedSeats); // Push selected seats into the bookedSeats array
    await bus.save();

    res.status(200).send('Seats booked successfully');
  } catch (error) {
    console.error('Error booking seats:', error);
    res.status(500).send('Internal Server Error');
  }
});
// API route to get booked seats for a specific bus
app.get('/api/bus/:busName', async (req, res) => {
  const { busName } = req.params;
  try {
    const bus = await Bus.findOne({ bus_name: busName });
    if (!bus) {
      return res.status(404).send('Bus not found');
    }
    res.json({ bookedSeats: bus.bookedSeats });
  } catch (error) {
    console.error('Error fetching booked seats:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
