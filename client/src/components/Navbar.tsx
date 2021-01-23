import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { StoreState } from '../reducers';
import { logoutUser } from '../actions/';

export const NavbarComponent = () => {
  const userSelector = (state: StoreState) => state.authedUser;
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutClicked = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <Navbar bg='light' expand='lg' sticky='top' className='p-4 shadow'>
      <Navbar.Brand>TRMS</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link to='/' className='px-3'>
            Home
          </Link>
          {user.isApprover ? (
            <Link to='/applications/review' className='px-3'>
              My Approvals
            </Link>
          ) : (
            <Link to='/applications' className='px-3'>
              My Applications
            </Link>
          )}
        </Nav>
        <Button onClick={handleLogoutClicked}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
