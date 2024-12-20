import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import '../App.css'; 
import BookingPageNavbar from '../auth/BookingPageNavbar'; 
import Input from '../components/Input';
import Label from '../components/Label';

const Booking = () => {
    const location = useLocation(); 
    const { bus, from, to, date } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState([]);

    const rows = [
        [1, 2, 3, 4, 5, 6, 7, 8],              
        [9, 10, 11, 12, 13, 14, 15, 16],       
        [null, null, null, null, null, null, null, 17],  
        [null, null, null, null, null, null, null, 18],  
        [19, 20, 21, 22, 23, 24, 25, 26],      
        [27, 28, 29, 30, 31, 32, 33, 34]       
    ];

    const toggleSeatSelection = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const totalPrice = selectedSeats.length * bus.price; 

    const handleBack = () => {
        console.log('Back button clicked');
    };

    return (
        <div>
            <BookingPageNavbar onBack={handleBack} />
            <div className="bus-container">
                <div className="left-container">
                    <h2>Select Your Seat</h2>
                    <div className="bus">
                        {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="bus-row" style={{ display: 'flex', justifyContent: 'center' }}>
                                {row.map((seat, seatIndex) =>
                                    seat === null ? (
                                        <div key={seatIndex} className="empty-space" style={{ width: '40px', height: '40px', margin: '5px' }} />
                                    ) : (
                                        <button
                                            key={seat}
                                            className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                                            onClick={() => toggleSeatSelection(seat)}
                                        >
                                            {seat}
                                        </button>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="right-container">
                    <h4>Booking Summary</h4>
                    <div className="booking-summary">
                        <div className="summary-item">
                            <Label htmlFor="from-point">From:</Label>
                            <Input type="text" id="from-point" value={from || ''} readOnly />
                        </div>
                        <div className="summary-item">
                            <Label htmlFor="to-point">To:</Label>
                            <Input type="text" id="to-point" value={to || ''} readOnly />
                        </div>
                        <div className="summary-item">
                            <Label htmlFor="pickup-date">Date:</Label>
                            <Input type="text" id="pickup-date" value={date || ''} readOnly />
                        </div>
                        <div className="summary-item">
                            <Label htmlFor="bus-type">Bus Type:</Label>
                            <Input type="text" id="bus-type" value={bus.type || ''} readOnly />
                        </div>
                        <div className="summary-item">
                            <Label htmlFor="selected-seats">Selected Seats:</Label>
                            <Input type="text" id="selected-seats" value={selectedSeats.length ? selectedSeats.join(', ') : 'None'} readOnly />
                        </div>
                        <div className="summary-item">
                            <Label htmlFor="per-seat-amount">Per Seat Amount:</Label>
                            <Input type="text" id="per-seat-amount" value={`$${bus.price}`} readOnly />
                        </div>
                        <div className="summary-item">
                            <Label htmlFor="total-price">Total Price:</Label>
                            <Input type="text" id="total-price" value={`$${totalPrice}`} readOnly />
                        </div>
                    </div>

                    <button className="pay-button">Proceed to Pay</button>
                </div>
            </div>
        </div>
    );
};

export default Booking;
