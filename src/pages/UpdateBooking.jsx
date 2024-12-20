import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const EditBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, seat } = location.state || {}; 

    const [updatedBooking, setUpdatedBooking] = useState(null);

  
    useEffect(() => {
        if (booking) {
            setUpdatedBooking({
                busNumber: booking.busNumber,
                bookedNoOfSeats: seat, 
                pickupPoint: booking.pickupPoint,
                destinationPoint: booking.destinationPoint,
                pickupTime: booking.pickupTime,
                pricePerSeat: booking.pricePerSeat,
                totalPrice: booking.totalPrice,
            });
        }
    }, [booking, seat]); 

    if (!updatedBooking) {
        return <div>No booking data available</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8081/bookings/${booking.id}`, updatedBooking);
            alert('Booking updated successfully!');
            navigate('/booking-details'); 
        } catch (error) {
            alert('Failed to update booking: ' + error.message);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: '100vh',
                width: '100%',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Card className="shadow-lg" style={{ width: '30%' }}>
                <Card.Body>
                    <h1>Edit Booking</h1>
                    <Form>
                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Bus Number</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="busNumber"
                                    value={updatedBooking.busNumber}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Seat Number</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="bookedNoOfSeats"
                                    value={updatedBooking.bookedNoOfSeats}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Pickup Point</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="pickupPoint"
                                    value={updatedBooking.pickupPoint}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Destination Point</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="destinationPoint"
                                    value={updatedBooking.destinationPoint}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Pickup Time</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="datetime-local"
                                    name="pickupTime"
                                    value={new Date(updatedBooking.pickupTime).toISOString().slice(0, 16)}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Price Per Seat</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="number"
                                    name="pricePerSeat"
                                    value={updatedBooking.pricePerSeat || ''}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Total Price</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="number"
                                    name="totalPrice"
                                    value={updatedBooking.totalPrice || ''}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditBooking;
