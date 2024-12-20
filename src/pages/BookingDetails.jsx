import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllBookingsQuery, useDeleteBookingMutation } from '../redux/service/BookingApi';
import { Button, Card, Row, Col } from 'react-bootstrap';
import Navbar from '../auth/Navbar';

const BookingDetails = () => {
    const navigate = useNavigate();
    const { data, error, isLoading, isError } = useGetAllBookingsQuery();
    const [deleteBooking] = useDeleteBookingMutation();

    if (isLoading) {
        return <div>Loading bookings...</div>;
    }

    if (isError) {
        return <div>Error fetching bookings: {error.message}</div>;
    }

    const handleEdit = (booking, seat) => {
        navigate(`/edit-booking/${booking.id}`, { state: { booking, seat } });
    };

    const handleCancel = async (bookingId, seatNumbers) => {
        try {
            await deleteBooking({ busNumber: bookingId, seatNumbers }).unwrap();
            alert('Booking canceled successfully!');
            navigate('/booking-details');
        } catch (error) {
            alert('Failed to cancel booking: ' + error.message);
        }
    };

    const textColor = "#123456";

    return (
        <div>
            <Navbar/>
            <div className="booking-details-container d-flex justify-content-center align-items-center">
            <div
                className={`card border-0 shadow-lg bg-light mx-auto ${
                    data?.length === 1 ? 'p-3' : 'p-4'
                }`}
                style={{ maxWidth: data?.length === 1 ? '600px' : '900px' }}
            >
                <div className="card-body">
                    <h2
                        className="text-center font-italic"
                        style={{ color: textColor }}
                    >
                        {data?.length === 1 ? 'Your Booking Detail' : 'Your Booking Details'}
                    </h2>
                    {data && data.length > 0 ? (
                        <Row
                            className="booking-list"
                            style={{
                                justifyContent:
                                    data.length === 1 ? 'center' : 'space-between',
                            }}
                        >
                            {data.map((booking, index) =>
                                booking.bookedNoOfSeats.map((seat, seatIndex) => (
                                    <Col
                                        xs={12}
                                        md={data.length === 1 ? 12 : 6}
                                        key={`${index}-${seatIndex}`}
                                        className="mb-4"
                                    >
                                        <Card
                                            className="booking-item"
                                            style={{ width: '100%' }}
                                        >
                                            <Card.Body>
                                                <div style={{ color: textColor }}>
                                                    <p>
                                                        <strong>Bus Number:</strong> {booking.busNumber}
                                                    </p>
                                                    <p>
                                                        <strong>Bus Type:</strong> {booking.busType}
                                                    </p>
                                                    <p>
                                                        <strong>Seat Number:</strong> {seat}
                                                    </p>
                                                    <p>
                                                        <strong>Trip:</strong> {booking.pickupPoint} -{' '}
                                                        {booking.destinationPoint}
                                                    </p>
                                                    <p>
                                                        <strong>Date:</strong>{' '}
                                                        {new Date(booking.pickupTime).toLocaleDateString()}{' '}
                                                        {new Date(booking.pickupTime).toLocaleTimeString()}
                                                    </p>
                                                    <p>
                                                        <strong>Per Seat Amount:</strong> ₹
                                                        {booking.pricePerSeat || 'Not Available'}
                                                    </p>
                                                    <p>
                                                        <strong>Total Amount:</strong> ₹
                                                        {booking.totalPrice || 'Not Available'}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`d-flex ${
                                                        data.length === 1
                                                            ? 'justify-content-center'
                                                            : 'justify-content-between'
                                                    }`}
                                                >
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handleEdit(booking, seat)}
                                                    >
                                                        Edit Booking
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleCancel(booking.busNumber, [seat])}
                                                    >
                                                        Cancel Booking
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            )}
                        </Row>
                    ) : (
                        <p>No bookings found</p>
                    )}
                    <div className="text-center mt-3">
                        <Button variant="secondary" onClick={() => navigate('/home')}>
                            Go to Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default BookingDetails;
