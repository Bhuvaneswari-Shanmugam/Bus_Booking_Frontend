import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
            <h4>Sidebar</h4>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a href="/customer-details" className="nav-link text-white">
                        Customer Details
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/bus-details" className="nav-link text-white">
                        Bus Details
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/trip-details" className="nav-link text-white">
                        Trip Details
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/booking-details" className="nav-link text-white">
                        Booking Details
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
