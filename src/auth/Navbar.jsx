import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.jpg';
import profile from '../assets/profile.jpg';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('User');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('Token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setFirstName(decodedToken.FirstName || 'User');
                setUserId(decodedToken.UserId || null);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const handleSignOut = () => {
        sessionStorage.removeItem('Token');
        sessionStorage.removeItem('RefreshToken');
        sessionStorage.removeItem('FirstName');
        sessionStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid me-5">
                <img src={logo} alt="Logo" width="90" height="60" className="d-inline-block align-text-top ms-3" />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link mx-3" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3" to="/footer">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3" to="/footer">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3" to="/footer">Services</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link mx-3" to="/">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3" to="/signup">Sign up</Link>
                        </li>
                    </ul>
                    <span className="dropdown-item-end py-2 px-2">{firstName}</span>
                    <div className="dropdown">
                        <button
                            className="btn btn-link dropdown-toggle p-0"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img src={profile} alt="User Profile" width="30" height="30" className="rounded-circle" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link className="dropdown-item" to={`/profile/${userId}`}>
                                    {firstName}'s Profile
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={handleSignOut}>Signout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
