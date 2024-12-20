import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
     <div style={{ display: 'flex', height: '100vh' }}>
       <Sidebar />
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '20px' }}>
        <Outlet/>
      </div>
    </div> 

   
  );
};

export default AdminLayout;
