import React, { useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../redux/service/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../auth/Navbar';

const UserProfile = () => {
    const { userId } = useParams();

    const navigate=useNavigate();

    const { data: responseData, error, isLoading } = useGetUserByIdQuery(userId);

    const [updateUser] = useUpdateUserMutation();

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    const fields = [
        { name: 'firstName', placeholder: 'First name', type: 'text', className: 'w-48 me-2', id: 'firstName' },
        { name: 'lastName', placeholder: 'Last name', type: 'text', className: 'w-48', id: 'lastName' },
        { name: 'email', placeholder: 'Email', type: 'email', className: 'w-100', id: 'email' },
        { name: 'password', placeholder: 'Password', type: 'password', className: 'w-100', id: 'password' }
       
    ];

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

    if (Object.keys(formData).length === 0) {
        setFormData(user);
    }

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
                                    {fields.map((field) =>
                                        field.isCheckbox ? (
                                            <div key={field.id} className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className={field.className}
                                                    id={field.id}
                                                    name={field.name}
                                                    checked={formData[field.name] || false}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor={field.id} className="form-check-label">
                                                    {field.label}
                                                </label>
                                            </div>
                                        ) : (
                                            <div key={field.id} className="mb-3 d-flex align-items-center">
                                                <label
                                                    htmlFor={field.id}
                                                    className="form-label me-2"
                                                    style={{ width: '150px' }}
                                                >
                                                    {field.placeholder}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    className="form-control"
                                                    id={field.id}
                                                    name={field.name}
                                                    value={formData[field.name] || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        )
                                    )}
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-2"
                                            onClick={() => navigate('/home')} 
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
