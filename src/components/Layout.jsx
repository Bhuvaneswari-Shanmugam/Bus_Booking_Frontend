import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../auth/Navbar';
import Footer from './Footer';


const Layout = () => {
  const location = useLocation();
  const showNavbar = [ '/home'];
  const showFooter = location.pathname === '/home';

  return (
    <div>
      <header>
        {showNavbar.includes(location.pathname) && <Navbar />} 
      </header>
      
      <main>
        <Outlet /> 
      </main>
      
      {showFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
