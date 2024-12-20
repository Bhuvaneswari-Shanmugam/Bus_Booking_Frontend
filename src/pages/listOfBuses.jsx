import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateBookingMutation } from '../redux/service/BookingApi';
import Navbar from '../auth/Navbar';
import Footer from '../pages/Footer';
import Input from '../components/Input';
import Label from '../components/Label';
import rating from '../assets/rating.jpg';
import seat from '../assets/seat.jpg';
import '../App.css';

const AvailableBuses = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bus, from, to, date } = location.state || {};
    const busId = bus?.busId;

    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null);
    const [viewSeats, setViewSeats] = useState(false);
    const [createBooking] = useCreateBookingMutation();

    const busData = [
        {
            name: "Sri Vijaya Travels",
            type: "NON-AC",
            departureTime: "10:30",
            departureLocation: "Salem New Bus Stand",
            duration: "07h 00m",
            arrivalTime: "17:30",
            arrivalLocation: "Koyambedu",
            rating: "783",
            originalPrice: 700,
            discountedPrice: 600,
            busId: 3,
        },
        {
            name: "SRS Travels",
            type: "NON-AC",
            departureTime: "11:00",
            departureLocation: "Salem New Bus Stand",
            duration: "08h 30m",
            arrivalTime: "19:30",
            arrivalLocation: "Chennai",
            rating: "912",
            originalPrice: 700,
            discountedPrice: 600,
            busId: 4,
        },
        {
            name: "Guna Travels",
            type: "AC",
            departureTime: "11:00",
            departureLocation: "Salem New Bus Stand",
            duration: "08h 30m",
            arrivalTime: "19:30",
            arrivalLocation: "Koyambedu",
            rating: "912",
            originalPrice: 800,
            discountedPrice: 750,
            busId: 1,
        },
        {
            name: "Sanjay Travels",
            type: "AC",
            departureTime: "11:00",
            departureLocation: "Salem New Bus Stand",
            duration: "08h 30m",
            arrivalTime: "19:30",
            arrivalLocation: "Chennai",
            rating: "912",
            originalPrice: 800,
            discountedPrice: 750,
            busId: 2,
        },
        {
            name: "RMS Travels",
            type: "SLEEPER",
            departureTime: "11:00",
            departureLocation: "Salem New Bus Stand",
            duration: "08h 30m",
            arrivalTime: "19:30",
            arrivalLocation: "Chennai",
            rating: "912",
            originalPrice: 1000,
            discountedPrice: 860,
            busId: 5,
        },
        {
            name: "Abi Travels",
            type: "SLEEPER",
            departureTime: "11:00",
            departureLocation: "Salem New Bus Stand",
            duration: "08h 30m",
            arrivalTime: "19:30",
            arrivalLocation: "Koyambedu",
            rating: "912",
            originalPrice: 1000,
            discountedPrice: 860,
            busId: 6,
        },
    ];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (selectedBus?.type === 'SLEEPER') {
            setRows([
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [null, null, null, null, null],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20],
            ]);
        } else {
            setRows([
                [1, 2, 3, 4, 5, 6, 7, 8],
                [9, 10, 11, 12, 13, 14, 15, 16],
                [null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [19, 20, 21, 22, 23, 24, 25, 26],
                [27, 28, 29, 30, 31, 32, 33, 34]
            ]);
        }
    }, [selectedBus]);

    const toggleSeatSelection = (seatNumber, e) => {
        e.stopPropagation();

        if (bookedSeats.includes(seatNumber)) {
            alert('This seat is already booked.');
            return;
        }

        setSelectedSeats(prevSelectedSeats =>
            prevSelectedSeats.includes(seatNumber)
                ? prevSelectedSeats.filter(seat => seat !== seatNumber)
                : [...prevSelectedSeats, seatNumber]
        );
    };

    const totalPrice = selectedSeats.length * (selectedBus?.discountedPrice || 0);
    const handlePayment = async () => {
        if (selectedSeats.length > 0) {
            try {
                const bookingDetails = {
                    pickupPoint: from,
                    destinationPoint: to,
                    pickupTime: date,
                    busNumber: selectedBus?.busId,
                    busType: selectedBus?.type || 'Non-AC',
                    bookedNoOfSeats: selectedSeats,
                    perSeatAmount: selectedBus?.discountedPrice,
                    totalAmount: totalPrice
                };
    

                const response = await createBooking(bookingDetails).unwrap();
 
                if (response.statusCode === 200) {
                    alert(`Payment Successful! Total Amount is ₹${totalPrice}`);
                    setBookedSeats(prevBookedSeats => [...prevBookedSeats, ...selectedSeats]);
                    setIsPaymentSuccessful(true);
                    setSelectedSeats([]);
                    navigate('/home');
                } else {
                    alert(`Booking failed. Reason: ${response.message}`);
                }
            } catch (error) {
                const errorMessage = error?.data?.message || error.message || 'Unknown error occurred';
                alert(`Booking failed. Reason: ${errorMessage}`);
            }
        } else {
            alert('Please select at least one seat to proceed with payment.');
        }
    };

    const handleDownloadTicket = () => {
        if (!isPaymentSuccessful) {
            alert('Please complete the payment before downloading the ticket.');
        } else if (selectedSeats.length === 0) {
            alert('Please select a seat to download the ticket.');
        } else {
            alert('Ticket downloaded successfully!');
        }
    };

    const handleBusClick = (bus) => {
        if (selectedBus?.busId === bus.busId) {
            setViewSeats(!viewSeats);
        } else {
            setSelectedBus(bus);
            setViewSeats(true);
        }
    };

    return (
        <div>
            <Navbar />
            <h5 className="text-center my-4"><strong>{from}</strong> - <strong>{to}</strong> on <strong>{date}</strong></h5>

            <div className="buses-container mt-4">
                {busData.map((bus) => (
                    <div key={bus.busId} className="card p-4 mb-2" style={{ cursor: 'pointer' }} onClick={() => handleBusClick(bus)}>
                        <div className="card-content d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{bus.name}</h5>
                                <p>{bus.type}</p>
                            </div>
                            <div>
                                <h5>{bus.departureTime}</h5>
                                <p>{bus.departureLocation}</p>
                            </div>
                            <div>
                                <h5>{bus.duration}</h5>
                            </div>
                            <div>
                                <h5>{bus.arrivalTime}</h5>
                                <p>{bus.arrivalLocation}</p>
                            </div>
                            <div>
                                <img src={rating} alt="rating-icon" width="70px" height="50px" />
                                <h5>👨‍👦‍👦 {bus.rating}</h5>
                            </div>
                            <div>
                                <p>Starts from</p>
                                <p>INR <del>{bus.originalPrice}</del> <ins>{bus.discountedPrice}</ins></p>
                            </div>
                            <button onClick={() => handleBusClick(bus)} style={{ backgroundColor: '#0080FF', color: 'white', border: 'none', borderRadius: '5px', height: '30px', width: '110px' }}>
                                {selectedBus?.busId === bus.busId && viewSeats ? 'Close' : 'View Seats'}
                            </button>
                        </div>

                       
                        <hr style={{ height: '2px', border: 'none', backgroundColor: 'black' }} />

                        {selectedBus && selectedBus.busId === bus.busId && viewSeats && (
                            <>
                                <div className='hide-content d-flex justify-content-around'>
                                    <div className="card-content" style={{ paddingRight: '10px' ,marginLeft:'150px'}}>
                                        <h4>Booking Summary</h4>
                                        {[{ label: "Bus ID", value: selectedBus.busId },
                                        { label: "From", value: from },
                                        { label: "To", value: to },
                                        { label: "Date", value: date },
                                        { label: "Bus Type", value: selectedBus.type },
                                        { label: "Selected Seats", value: selectedSeats.join(', ') || 'None' },
                                        { label: "Total Price", value: `₹${totalPrice}` }]
                                            .map(({ label, value }) => (
                                                <div className="summary-item" key={label}>
                                                    <Label htmlFor={label}>{label}:</Label>
                                                    <Input type="text" id={label} value={value} readOnly />
                                                </div>
                                            ))}
                                        <div className='btn-container d-flex justify-content-between mt-5'>
                                            <button className="pay-button btn btn-primary" onClick={handlePayment}>To Pay</button>
                                            <button className="pay-button btn btn-primary" onClick={handleDownloadTicket}>Download Ticket</button>
                                        </div>
                                    </div>

                                    
                                    <div className="bus" style={{ flexGrow: '1', marginTop: '50px' }}>
                                        {rows.map((row, rowIndex) => (
                                            <div key={rowIndex} className="bus-row">
                                                {row.map((seatNumber, seateIndex) =>
                                                    seatNumber === null ? (
                                                        <div key={seateIndex} className="empty-space" style={{ width: '40px', height: '40px', margin: '3px' }} />
                                                    ) : (
                                                        <img
                                                            key={seatNumber}
                                                            src={seat}
                                                            alt={`Seat ${seatNumber}`}
                                                            className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
                                                            onClick={(e) => toggleSeatSelection(seatNumber, e)}
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                margin: '3px',
                                                                cursor: bookedSeats.includes(seatNumber) ? 'not-allowed' : 'pointer',
                                                                border: selectedSeats.includes(seatNumber)
                                                                    ? '2px solid green'
                                                                    : bookedSeats.includes(seatNumber)
                                                                        ? '2px solid red'
                                                                        : '2px solid transparent',
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default AvailableBuses;