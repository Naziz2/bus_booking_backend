import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NAVBAR from './components/Navbar';
import HomePage from './components/Home';
import BookingPage from './components/Booking';
import BusPage from './components/BusDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <NAVBAR />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/bus" element={<BusPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
