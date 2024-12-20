import React, { useState, useEffect } from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const ProfileUserName = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem('FirstName'); 
    setUsername(storedName || "Guest");
  }, []);
  

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header username={storedName} /> 
      <div className="d-flex" style={{ flexGrow: 1, overflow: 'hidden', marginTop: '80px' }}>
        <main className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileUserName;
