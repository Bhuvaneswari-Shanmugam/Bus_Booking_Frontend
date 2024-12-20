import React, { useState } from 'react';
import { useGetAllBusDetailsQuery, useCreateBusMutation, useUpdateBusMutation } from '../../redux/service/BusApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusDetails = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const { data: busDetails = [], error: fetchError, isFetching } = useGetAllBusDetailsQuery({
        page: currentPage,
        size: pageSize,
    });

    const [createBus] = useCreateBusMutation();
    const [updateBus] = useUpdateBusMutation();

    const [selectedOption, setSelectedOption] = useState('display');
    const [formData, setFormData] = useState({
        id: '',
        number: '',
        tripNumber: '',
        type: '',
        capacity: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreateBus = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            await createBus(formData).unwrap();
            toast.success('Bus created successfully!');
            setSelectedOption('display');
            resetForm();
        } catch (error) {
            toast.error('Failed to create bus. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpdateBus = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            await updateBus({ id: formData.id, busData: formData }).unwrap();
            toast.success('Bus updated successfully!');
            setSelectedOption('display');
            resetForm();
        } catch (error) {
            toast.error('Failed to update bus. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleEdit = (bus) => {
        setFormData({
            id: bus.id,
            number: bus.number,
            tripNumber: bus.tripNumber,
            type: bus.type,
            capacity: bus.capacity,
        });
        setSelectedOption('update');
    };

    const resetForm = () => {
        setFormData({
            id: '',
            number: '',
            tripNumber: '',
            type: '',
            capacity: '',
        });
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const renderContent = () => {
        if (selectedOption === 'create' || selectedOption === 'update') {
            const isUpdatingMode = selectedOption === 'update';
            return (
                <div>
                    <h2>{isUpdatingMode ? 'Update Bus' : 'Create New Bus'}</h2>
                    <form onSubmit={isUpdatingMode ? handleUpdateBus : handleCreateBus}>
                        <div className="d-flex mb-3">
                            <label htmlFor="busNumber" className="form-label me-2" style={{ width: '150px' }}>
                                Bus Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="busNumber"
                                name="number"
                                value={formData.number}
                                onChange={handleInputChange}
                                placeholder="Enter Bus Number"
                                required
                            />
                        </div>
                        <div className="d-flex mb-3">
                            <label htmlFor="tripNumber" className="form-label me-2" style={{ width: '150px' }}>
                                Trip Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="tripNumber"
                                name="tripNumber"
                                value={formData.tripNumber}
                                onChange={handleInputChange}
                                placeholder="Enter Trip Number"
                                required
                            />
                        </div>
                        <div className="d-flex mb-3">
                            <label htmlFor="type" className="form-label me-2" style={{ width: '150px' }}>
                                Bus Type
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                placeholder="Enter Bus Type"
                                required
                            />
                        </div>
                        <div className="d-flex mb-3">
                            <label htmlFor="capacity" className="form-label me-2" style={{ width: '150px' }}>
                                Capacity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                placeholder="Enter Capacity"
                                min="1"
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary me-4" disabled={isProcessing}>
                                {isProcessing ? 'Processing...' : isUpdatingMode ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setSelectedOption('display');
                                    resetForm();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        if (selectedOption === 'display') {
            if (isFetching) return <p>Loading...</p>;
            if (fetchError) return <p className="text-danger">Failed to fetch bus details.</p>;

            const busList = Array.isArray(busDetails) ? busDetails : busDetails.data || [];

            return (
                <div>
                    <div>
                        <div className=" d-flex justify-content-end align-items-center ">
                            <button className="btn btn-secondary" onClick={() => setSelectedOption('create')}>
                                Create New Bus
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <h2 className="text-primary font-weight-bold">Bus List</h2>
                    </div>
                    <div className="table-responsive my-4" style={{ margin: 'auto', width: '85%' }}>
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>S.No</th>
                                    <th>Bus Number</th>
                                    <th>Trip Number</th>
                                    <th>Type</th>
                                    <th>Capacity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {busList.map((bus, index) => (
                                    <tr key={bus.id}>
                                        <td>{index + 1 + currentPage * pageSize}</td>
                                        <td>{bus.number}</td>
                                        <td>{bus.trip}</td>
                                        <td>{bus.type}</td>
                                        <td>{bus.capacity}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleEdit(bus)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div
                        className="d-flex justify-content-center align-items-center my-3"
                        style={{ width: '100%' }}
                    >
                        <button
                            className="btn btn-primary me-4"
                            onClick={handlePrevPage}
                            disabled={currentPage <= 0}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNextPage}
                            disabled={busList.length < pageSize}
                        >
                            Next
                        </button>
                    </div>
                </div>
            );
        }

        return <p>Please select an option to proceed.</p>;
    };

    return (
        <div className="admin-page-bgbus-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="card" style={{ width: '70%' }}>
        {renderContent()}
    </div>
    <ToastContainer />
</div>
    );
};

export default BusDetails;
