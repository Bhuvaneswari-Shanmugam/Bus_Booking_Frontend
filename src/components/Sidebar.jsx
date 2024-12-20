import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    const menuItems = [
        { path: '/customer-details', label: 'Customer Details' },
        { path: '/bus-details', label: 'Bus Details' },
        { path: '/trip-details', label: 'Trip Details' },
        { path: '/all-booking-details', label: 'Booking Details' },
        { path: '/seat', label: 'Seat Details' },
    ];

    return (
        <div
            className="border-end"
            style={{
                height: '100vh',
                width: '250px',
                backgroundColor: '#9932CC',
                color: '#fff',
                paddingTop: '10px',
                marginTop: '0px',
            }}
        >
            <h5 className="text-center text-white mb-4">Admin Panel</h5>
            <ul className="list-group list-group-flush">
                {menuItems.map((item, index) => (
                    <li key={index} className="list-group-item" style={{ backgroundColor: '#9932CC', border: 'none' }}>
                        <Link
                            to={item.path}
                            style={{
                                textDecoration: 'none',
                                color: '#fff',
                                display: 'block',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                backgroundColor: '',
                            }}
                            className="sidebar-link"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Sidebar;
