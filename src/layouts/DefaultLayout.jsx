import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavbarComponent from '../components/Navbar';

const DefaultLayout = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const sidebarHandler = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar
          isActive={isSidebarActive}
          handleHamburgerBtnClick={sidebarHandler}
        />
        <div className="main-panel">
          <NavbarComponent handleHamburgerBtnClick={sidebarHandler} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
