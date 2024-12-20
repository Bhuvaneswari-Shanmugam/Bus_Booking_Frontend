import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCreateSeatMutation, useFetchSeatsQuery } from '../../redux/service/SeatApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeatManagement = () => {
  const [selectedOption, setSelectedOption] = useState('display');
  const [busNumber, setBusNumber] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [createSeat, { isLoading, isError, error }] = useCreateSeatMutation();

  const [page, setPage] = useState(0);
  const size = 10;

  const { data: seats, isLoading: isLoadingSeats, isError: isErrorSeats, error: fetchError } = useFetchSeatsQuery({ page, size });

  const seatList = Array.isArray(seats?.data) ? seats.data : [];

  const handleCreateSeat = async (e) => {
    e.preventDefault();

    if (!busNumber || !seatNumber) {
      toast.error("Please enter both Bus Number and Seat Number.");
      return;
    }

    if (isNaN(seatNumber) || seatNumber <= 0) {
      toast.error("Please enter a valid positive number for Seat Number.");
      return;
    }

    try {
      await createSeat({ busNumber, seatNumber }).unwrap();
      setBusNumber('');
      setSeatNumber('');
      toast.success('Seat created successfully');
      setPage(0);
      setSelectedOption('display'); 
    } catch (err) {
      console.error('Failed to create seat:', err);
      toast.error(`Error: ${err?.data?.message || 'An unexpected error occurred'}`);
    }
  };

  const handleCancel = () => {
    setSelectedOption('display'); 
  };

  const renderContent = () => {
    if (selectedOption === 'create') {
      return (
        <div>
          <h2>Create Seat Arrangement</h2>
          <form onSubmit={handleCreateSeat}>
            <div className="mb-3">
              <label htmlFor="busNumber" className="form-label">Bus Number</label>
              <input
                type="text"
                className="form-control"
                id="busNumber"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                placeholder="Enter Bus Number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="seatNumber" className="form-label">Seat Number</label>
              <input
                type="number"
                className="form-control"
                id="seatNumber"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                placeholder="Enter Seat Number"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Submit'}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
          </form>
          {isError && (
            <div className="alert alert-danger mt-3">
              Error: {error?.message || 'Something went wrong!'}
            </div>
          )}
        </div>
      );
    }

    if (selectedOption === 'display') {
      if (isLoadingSeats) {
        return <div>Loading seat arrangements...</div>;
      }
      if (isErrorSeats) {
        return <div>Error: {fetchError?.message || 'Something went wrong!'}</div>;
      }

      return (
        <div>
          <div className="d-flex justify-content-center ">
            <h2 className="text-primary font-weight-bold">Seat List</h2>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Bus Number</th>
                <th>Seat Number </th>
              </tr>
            </thead>
            <tbody>
              {seatList.map((seat, index) => (
                <tr key={seat.id}>
                  <td>{index + 1 + page * size}</td>
                  <td>{seat.busNumber}</td>
                  <td>{seat.seatNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-primary me-4"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setPage(page + 1)}
              disabled={!seats || seats.length < size}
            >
              Next
            </button>
          </div>
        </div>
      );
    }

    if (selectedOption === 'update') {
      return (
        <div>
          <h2>Update Seat Arrangement</h2>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end p-4">
        {selectedOption === 'display' && (
          <button className="btn btn-secondary me-4" onClick={() => setSelectedOption('create')}>Create</button>
        )}
      </div>
      {renderContent()}
      <ToastContainer />
    </div>
  );
};

export default SeatManagement;
