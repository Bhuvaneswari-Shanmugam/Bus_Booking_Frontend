import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchAllBookingQuery } from '../../redux/service/BookingDetailsApi';

const AllBookingDetails = () => {
    const [page, setPage] = useState(0); 
    const size = 10;  

    const { data, error, isLoading, isError } = useFetchAllBookingQuery({ page, size });

    const handleNextPage = () => {
        if (data && data.data.length === size) { 
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center py-5">Loading...</div>;
        }
        if (isError) {
            return <div className="text-center text-danger py-5">Error loading bookings: {error.message}</div>;
        }

        const bookingList = data?.data || [];

        return (
            <div className="booking-list justify-content-center align-items-center my-4">
                <div className="booking-details text-center my-4">
                    <h2 className="text-primary font-weight-bold">Booking Details</h2>
                </div>

                <div className="table-responsive" style={{ margin: 'auto', width: '85%' }}>
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>S.No</th>
                                <th>Bus Number</th>
                                <th>Seat Number</th>
                                <th>Trip</th>
                                <th>Pickup Date & Time</th>
                                <th>Per Seat Amount</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingList.length > 0 ? (
                                bookingList.map((booking, index) =>
                                    booking.bookedNoOfSeats.map((seat, seatIndex) => (
                                        <tr key={`${index}-${seatIndex}`}>
                                            <td>{index + 1 + page * size}</td>
                                            <td>{booking.bus.number}</td>
                                            <td>{seat}</td>
                                            <td>{`${booking.trip.pickupPoint} - ${booking.trip.destinationPoint}`}</td>
                                            <td>
                                                {new Date(booking.trip.pickupTime).toLocaleString()}
                                            </td>
                                            <td>₹{booking.perSeatAmount || 'N/A'}</td>
                                            <td>₹{booking.totalPrice || 'N/A'}</td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-end my-3" style={{ width: '85%', margin: 'auto' }}>
                    <button
                        className="btn btn-primary me-4"
                        onClick={handlePrevPage}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleNextPage}
                        disabled={data && data.data.length < size} 
                    >
                        Next
                    </button>
                </div>

            </div>
        );
    };

    return (
        <div>{renderContent()}</div>
    );
};

export default AllBookingDetails;
