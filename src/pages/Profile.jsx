import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../redux/service/UserApi'; 
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { data: userDetails, error, isLoading } = useGetUserByIdQuery(id);

    if (isLoading) {
        return <p>Loading...</p>; 
    }

    if (error) {
        toast.error("Failed to load user details."); 
        return <p>Error loading user details!</p>; 
    }

    const handleEditProfile = () => {
        navigate(`/edit-profile/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2>{userDetails.first_name}'s Profile</h2>
            <div className="card profile-details mt-3">
                <div className="card-body">
                    <h3 className="card-title">User Details</h3>
                    <p className="card-text"><strong>First Name:</strong> {userDetails.first_name || 'N/A'}</p>
                    <p className="card-text"><strong>Last Name:</strong> {userDetails.last_name || 'N/A'}</p>
                    <p className="card-text"><strong>Date of Birth:</strong> {userDetails.date_of_birth || 'N/A'}</p>
                    <p className="card-text"><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
                    <p className="card-text"><strong>Gender:</strong> {userDetails.gender || 'N/A'}</p>
                    <p className="card-text"><strong>Contact Number:</strong> {userDetails.contact_number || 'N/A'}</p>
                    <p className="card-text"><strong>Address:</strong> {userDetails.address || 'N/A'}</p>
                    <p className="card-text"><strong>Role:</strong> {userDetails.role || 'N/A'}</p>
                    <button onClick={handleEditProfile} className="btn mt-3" style={{ color: 'white', backgroundColor: '#0066b8' }}>
                        Edit Profile
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
