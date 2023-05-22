import React from 'react';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Image,
  Stack,
} from 'react-bootstrap';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../redux/user/userSlice';

const NavbarComponent = ({ handleHamburgerBtnClick }) => {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <Navbar
        bg="light"
        sticky="top"
      >
        <Container>
          <Stack
            className="w-100"
            direction="horizontal"
            gap={3}
          >
            <Button
              className="d-sm-none"
              variant="light"
              onClick={handleHamburgerBtnClick}
            >
              <RxHamburgerMenu />
            </Button>
            <Form.Control
              className="d-none d-sm-block custom-controller flex-grow-1"
              placeholder="Add your item here..."
            />
            <Button variant="light">
              <BsSearch />
            </Button>
            {user ? (
              <Dropdown
                className="ms-auto"
                align="end"
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="d-flex custom-dropdown align-items-center"
                >
                  <Image
                    src={user.avatar}
                    alt="user"
                    width="30"
                    height="30"
                    className="rounded-circle me-2"
                  />
                  {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogoutClick}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="navbar__btn-groups ms-auto d-flex gap-2">
                <NavLink
                  className="btn btn-primary"
                  to="/signin"
                >
                  Signin
                </NavLink>
                <NavLink
                  className="btn btn-primary"
                  to="/signup"
                >
                  Signup
                </NavLink>
              </div>
            )}
          </Stack>
        </Container>
      </Navbar>
    </>
  );
};

NavbarComponent.propTypes = {
  handleHamburgerBtnClick: PropTypes.func.isRequired,
};

export default NavbarComponent;
