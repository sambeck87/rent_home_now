import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Sidebar.css';

import {
  TiSocialGooglePlus,
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialVimeo,
  TiSocialPinterest,
} from 'react-icons/ti';

import { RxCross1 } from 'react-icons/rx';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/user/userSlice';

const Sidebar = ({ isActive, handleHamburgerBtnClick }) => {
  const user = useSelector(getUser);
  const hideSidebar = () => {
    if (isActive) {
      handleHamburgerBtnClick();
    }
  };

  return (
    <div className={`sidebar ${isActive ? 'sidebar--show' : ''}`}>
      <div className="sidebar__logo-wrapper d-flex align-items-center justify-content-between">
        <NavLink
          to="/"
          className="sidebar__logo"
        >
          Rent Home Now
        </NavLink>
        <Button
          className="d-sm-none"
          variant="light"
          onClick={hideSidebar}
        >
          <RxCross1 className="f-4" />
        </Button>
      </div>
      <ul className="nav flex-column sidebar__nav">
        <li className="nav-item sidebar__nav-item">
          <NavLink
            className={({ isActive }) => (isActive
              ? 'nav-link sidebar__nav-link sidebar__nav-active'
              : 'nav-link sidebar__nav-link')}
            to="/"
            exact
            onClick={hideSidebar}
          >
            Home
          </NavLink>
        </li>
        {user?.name && (
          <>
            <li className="nav-item sidebar__nav-item">
              <NavLink
                className={({ isActive }) => (isActive
                  ? 'nav-link sidebar__nav-link sidebar__nav-active'
                  : 'nav-link sidebar__nav-link')}
                to="/my-reservations"
                exact
                onClick={hideSidebar}
              >
                My reservations
              </NavLink>
            </li>
            <li className="nav-item sidebar__nav-item">
              <NavLink
                className={({ isActive }) => (isActive
                  ? 'nav-link sidebar__nav-link sidebar__nav-active'
                  : 'nav-link sidebar__nav-link')}
                to="/my-property"
                exact
                onClick={hideSidebar}
              >
                My Properties
              </NavLink>
            </li>
            <li className="nav-item sidebar__nav-item">
              <NavLink
                className={({ isActive }) => (isActive
                  ? 'nav-link sidebar__nav-link sidebar__nav-active'
                  : 'nav-link sidebar__nav-link')}
                to="/new-property"
                exact
                onClick={hideSidebar}
              >
                New Property
              </NavLink>
            </li>
            <li className="nav-item sidebar__nav-item">
              <NavLink
                className={({ isActive }) => (isActive
                  ? 'nav-link sidebar__nav-link sidebar__nav-active'
                  : 'nav-link sidebar__nav-link')}
                to="/reservations/new"
                exact
                onClick={hideSidebar}
              >
                Add Reservation
              </NavLink>
            </li>
          </>
        )}

      </ul>

      <div className="sidebar__bottom d-flex flex-column">
        <div className="d-flex sidebar__bottom-icons">
          <TiSocialGooglePlus className="sidebar__bottom-icon" />
          <TiSocialFacebook className="sidebar__bottom-icon" />
          <TiSocialTwitter className="sidebar__bottom-icon" />
          <TiSocialVimeo className="sidebar__bottom-icon" />
          <TiSocialPinterest className="sidebar__bottom-icon" />
        </div>
        <div className="d-flex gap-1 flex-wrap">
          <span className="d-block">@ 2023</span>

          <a
            href="https://github.com/shahadat3669"
            target="_blank"
            rel="noopener noreferrer"
          >
            shahadat3669
          </a>
          <a
            href="https://github.com/sambeck87"
            target="_blank"
            rel="noopener noreferrer"
          >
            sambeck87
          </a>
          <a
            href="https://github.com/GutemaG"
            target="_blank"
            rel="noopener noreferrer"
          >
            GutemaG
          </a>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleHamburgerBtnClick: PropTypes.func.isRequired,
};

export default Sidebar;
