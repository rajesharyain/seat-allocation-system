import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import '../styles/TrainCoach.css';
import api from '../api';
import TrainCpmpartment from './TrainCompartment';

const NUM_ROWS = 5;

const TOTAL_ROWS = 12;
const SEATS_PER_ROW = 12;
const SIDE_LOWER_COUNT = 3;
const seatData = [
  // Data for each container's content
  [
    { seatNumber: 1, status: 'available' },
    { seatNumber: 2, status: 'available' },
    { seatNumber: 3, status: 'available' },
    { seatNumber: 4, status: 'available' },
    { seatNumber: 5, status: 'available' },
    { seatNumber: 6, status: 'available' },
    { seatNumber: 7, status: 'available' },
    { seatNumber: 8, status: 'available' },

    { seatNumber: 9, status: 'available' },
    { seatNumber: 10, status: 'available' },
    { seatNumber: 11, status: 'available' },
    { seatNumber: 12, status: 'available' },
    { seatNumber: 13, status: 'available' },
    { seatNumber: 14, status: 'available' },
    { seatNumber: 15, status: 'available' },
    { seatNumber: 16, status: 'available' },
  ],
  // Add more arrays for each container's content as needed
];


const TrainCoach: React.FC = () => {
  const [seats, setSeats] = useState(
    Array(NUM_ROWS).fill(Array(SEATS_PER_ROW).fill({ status: 'available', tier: 'standard' }))
  );
  const [error, setError] = useState<string | null>(null);

  const handleSeatSelect = async (rowIndex: number, seatIndex: number) => {
    setError(null);
    const seat = seats[rowIndex][seatIndex];


    if (seat.status === 'available') {
      try {
        const response = await api.post(
          '/selectSeat',
          {
            seatId: seat.id,
            bookingTime: Date.now(),
          }
        );

        if (response.status === 200) {
          const updatedSeats = seats.map((row, rIndex) =>
            rIndex === rowIndex
              ? row.map((seat: any, sIndex: number) => (sIndex === seatIndex ? { ...seat, status: 'selected' } : seat))
              : row
          );
          setSeats(updatedSeats);
        }
      } catch (error) {
        setError('Failed to select the seat. Please try again.');
        console.error('Error:', error);
      }
    } else if (seat.status === 'selected') {
      // Implement deselection logic here if needed
    }
  };

  const handleConfirmBooking = async () => {
    setError(null);
    try {
      // Implement booking confirmation logic here using Axios
    } catch (error) {
      setError('Failed to confirm booking. Please try again.');
      console.error('Error:', error);
    }
  };

  const renderSeat = (seat: any, rowIndex: number, seatIndex: number) => {
    const seatNumber = seat.seatNumber;
    const status = seat.status;

    const seatClass = `seat ${status === 'available' ? 'available' : status === 'selected' ? 'selected' : 'booked'}`;

    return (
      <div key={seatNumber} className={seatClass} onClick={() => handleSeatSelect(rowIndex, seatIndex)}>
        {status === 'booked' ? (
          <FontAwesomeIcon icon={faCouch} color="#ccc" />
        ) : (
          <div>{seatNumber}</div>
        )}
      </div>
    );
  };

  const renderRow = (row: any[], rowIndex: number) => {
    return (
      <div key={rowIndex} className="row">
        {row.map((seat, seatIndex) => renderSeat(seat, rowIndex, seatIndex))}
      </div>
    );
  };

  return (
    <div>
      <TrainCpmpartment />
      <TrainCpmpartment />
   
      <div className="container">
        <div className="left">
          <div className="flex-item">
            <div className="item">1</div>
            <div className="item">2</div>
            <div className="item">3</div>
          </div>
          <div className="flex-item">
            <div className="item">4</div>
            <div className="item">5</div>
            <div className="item">6</div>
          </div>
        </div>

        <div className="right">
          <div className="flex-item-col">
            <div className="item">7</div>
            <div className="item">8</div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TrainCoach;

/**
 * 
 * 
 * 
    <div className="train-coach">
      <h2>Train Coach Seat Allocation</h2>
      {error && <div className="error-message">{error}</div>}
      {seatData.map((row, rowIndex) => (
        <div key={rowIndex} className="container">
          <div className="left">
            <div className="flex-item">
              {renderRow(row.slice(0, 3), rowIndex)}
            </div>
            <div className="flex-item">
              {renderRow(row.slice(3, 6), rowIndex)}
            </div>
          </div>
          <div className="right">
            <div className="flex-item-col">
              {renderSeat(row[6], rowIndex, 6)}
              {renderSeat(row[7], rowIndex, 7)}
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
   
 */