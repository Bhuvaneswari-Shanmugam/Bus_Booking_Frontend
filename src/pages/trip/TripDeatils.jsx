import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatISO } from 'date-fns';
import { useFetchTripsQuery, useCreateTripMutation, useUpdateTripMutation } from '../../redux/service/TripApi';

const TripDetails = () => {
    const [selectedOption, setSelectedOption] = useState('display');
    const [tripData, setTripData] = useState({
        tripNumber: '',
        pickupPoint: '',
        destinationPoint: '',
        pickupTime: '',
        reachingTime: '',
        expense: '',
    });
    const [selectedTripId, setSelectedTripId] = useState(null);
    const [page, setPage] = useState(0);
    const size = 10;

    const { data, isLoading, error } = useFetchTripsQuery({ page, size });
    const trips = data?.data || [];
    const totalPages = data?.totalPages || 1;

    const [createTrip] = useCreateTripMutation();
    const [updateTrip] = useUpdateTripMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripData({ ...tripData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tripData.tripNumber) {
            alert('Trip Number is required.');
            return;
        }

        try {
            const formattedPickupTime = formatISO(new Date(tripData.pickupTime));
            const formattedReachingTime = formatISO(new Date(tripData.reachingTime));

            const dataToSend = {
                ...tripData,
                pickupTime: formattedPickupTime,
                reachingTime: formattedReachingTime,
                expense: parseInt(tripData.expense),
            };

            if (selectedTripId) {
                await updateTrip({
                    id: selectedTripId,
                    ...dataToSend,
                }).unwrap();
                alert('Trip updated successfully!');
            } else {
                await createTrip(dataToSend).unwrap();
                alert('Trip created successfully!');
            }

            setTripData({
                tripNumber: '',
                pickupPoint: '',
                destinationPoint: '',
                pickupTime: '',
                reachingTime: '',
                expense: '',
            });
            setSelectedTripId(null);
            setSelectedOption('display'); 
        } catch (err) {
            console.error(err);
            alert('Failed to submit trip.');
        }
    };

    const handleUpdate = (trip) => {
        setSelectedOption('create');
        setTripData({
            tripNumber: trip.tripNumber,
            pickupPoint: trip.pickupPoint,
            destinationPoint: trip.destinationPoint,
            pickupTime: formatISO(new Date(trip.pickupTime)),
            reachingTime: formatISO(new Date(trip.reachingTime)),
            expense: trip.expense,
        });
        setSelectedTripId(trip.id);
    };

    const handlePrevious = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderContent = () => {
        if (selectedOption === 'create') {
            return (
                <div>
                    <h2>{selectedTripId ? 'Update Trip' : 'Create Trip'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tripNumber" className="form-label">Trip Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tripNumber"
                                name="tripNumber"
                                placeholder="Enter Trip Number"
                                value={tripData.tripNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pickupPoint" className="form-label">Pickup Point</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pickupPoint"
                                name="pickupPoint"
                                placeholder="Enter Pickup Point"
                                value={tripData.pickupPoint}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="destinationPoint" className="form-label">Destination Point</label>
                            <input
                                type="text"
                                className="form-control"
                                id="destinationPoint"
                                name="destinationPoint"
                                placeholder="Enter Destination Point"
                                value={tripData.destinationPoint}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pickupTime" className="form-label">Pickup Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="pickupTime"
                                name="pickupTime"
                                value={tripData.pickupTime ? tripData.pickupTime.slice(0, 16) : ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reachingTime" className="form-label">Reaching Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="reachingTime"
                                name="reachingTime"
                                value={tripData.reachingTime ? tripData.reachingTime.slice(0, 16) : ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="expense" className="form-label">Expense</label>
                            <input
                                type="number"
                                className="form-control"
                                id="expense"
                                name="expense"
                                placeholder="Enter Expense"
                                value={tripData.expense}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {selectedTripId ? 'Update' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => setSelectedOption('display')}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            );
        }

        if (selectedOption === 'display') {
            return (
                <div>
                    <div className="d-flex justify-content-center">
                        <h2 className="text-primary font-weight-bold">Trip List</h2>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-5">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-danger py-5">Error loading trips</div>
                    ) : (
                        <div className="table-responsive">
                            <table
                                className="table table-striped table-hover table-bordered"
                                style={{ width: '80%', marginLeft: '10%' }}
                            >
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Trip Number</th>
                                        <th>Pickup Point</th>
                                        <th>Destination Point</th>
                                        <th>Pickup Time</th>
                                        <th>Reaching Time</th>
                                        <th>Expense</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trips.map((trip, index) => (
                                        <tr key={trip.id}>
                                            <td>{page * size + index + 1}</td>
                                            <td>{trip.tripNumber}</td>
                                            <td>{trip.pickupPoint}</td>
                                            <td>{trip.destinationPoint}</td>
                                            <td>{trip.pickupTime}</td>
                                            <td>{trip.reachingTime}</td>
                                            <td>{trip.expense}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleUpdate(trip)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div
                                className="d-flex justify-content-end my-3"
                                style={{ width: '80%', margin: 'auto' }}
                            >
                                <button
                                    className="btn btn-primary me-4"
                                    onClick={handlePrevious}
                                    disabled={page <= 0}
                                >
                                    Previous
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleNext}
                                    disabled={trips.length < size}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    };

    return (
        <div>
            {selectedOption === 'display' && (
                <div className="d-flex justify-content-end align-items-center p-4">
                    <button onClick={() => setSelectedOption('create')} className="btn btn-secondary mx-4">
                        Create Trip
                    </button>
                </div>
            )}
            {renderContent()}
        </div>
    );
};

export default TripDetails;
