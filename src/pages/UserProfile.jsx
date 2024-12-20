import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../redux/service/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../auth/Navbar';

const UserProfile = () => {
    const { userId } = useParams();

    const { data: responseData, error, isLoading } = useGetUserByIdQuery(userId);

    const [updateUser] = useUpdateUserMutation();

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!responseData || !responseData.data) {
        return <div>No user data found</div>;
    }

    const user = responseData.data;

    if (formData.firstName === undefined) {
        setFormData(user);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser({ id: userId, data: formData }).unwrap();
            setIsEditMode(false);
            alert('User data updated successfully');
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Error updating user data');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center min-vh-88">
                <div className="card" style={{ maxWidth: '550px', width: '100%', top: '100px', padding: '20px' }}>
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={handleFormSubmit}>
                                    <h3 className="text-center mb-4">Edit Details</h3>
                                    <div className="mb-3 d-flex align-items-center">
                                        <label htmlFor="email" className="form-label me-2" style={{ width: '150px' }}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <label htmlFor="gender" className="form-label me-2" style={{ width: '150px' }}>
                                            Gender
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="gender"
                                            name="gender"
                                            value={formData.gender || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <label htmlFor="address" className="form-label me-2" style={{ width: '150px' }}>
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={formData.address || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <label htmlFor="contactNumber" className="form-label me-2" style={{ width: '150px' }}>
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="contactNumber"
                                            name="contactNumber"
                                            value={formData.contactNumber || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <label htmlFor="dateOfBirth" className="form-label me-2" style={{ width: '150px' }}>
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-2"
                                            onClick={() => setIsEditMode(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
