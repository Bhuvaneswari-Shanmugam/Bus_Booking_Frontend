import React from 'react';
import Navbar from '../auth/Navbar';
import Footer from '../pages/Footer';
import { useLocation, Outlet } from 'react-router-dom';

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
