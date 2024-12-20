import React, { useState } from 'react';
import { useFetchAllUsersQuery } from '../../redux/service/CustomerApi';

const CustomerDetails = () => {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data: customers, isLoading, error } = useFetchAllUsersQuery({ page, size });

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => ( prev - 1 ));

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-5">Loading...</div>;
    }
    if (error) {
      return <div className="text-center text-danger py-5">Error loading customers: {error.message}</div>;
    }

    const customerList = customers?.data || [];

    return (
      <div className="customer-list justify-content-center align-items-center my-4">
        <div className="customer-details text-center my-4">
          <h2 className="text-primary font-weight-bold">Customer List</h2>
        </div>

        <div className="table-responsive" style={{ margin: 'auto', width: '85%' }}>
          <table className="table table-striped table-hover table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th>S.No</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customerList?.length && customerList?.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1 + page * size}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="d-flex justify-content-end my-3"
          style={{ width: '85%', margin: 'auto' }}
        >
          <button
            className="btn btn-primary me-4"
            onClick={handlePrevPage}
            disabled={page === 0}
          >
            Previous
          </button>
          <button className="btn btn-primary" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    );
  };

  return <div className="p-4">{renderContent()}</div>;
};

export default CustomerDetails;
