import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { StoreState } from '../reducers';
import { NavbarComponent } from './Navbar';
import { ClaimComponent } from './Claim';

export const ClaimsListComponent = () => {
  const claimsSelector = (state: StoreState) => state.claims;
  const claims = useSelector(claimsSelector);

  const userSelector = (state: StoreState) => {
    console.log(state);
    return state.authedUser;
  };
  const user = useSelector(userSelector);

  return (
    <>
      <NavbarComponent />
      <Container className='pb-4'>
        <ListGroup className='py-3'>
          <ListGroup.Item className='d-flex justify-content-between shadow p-4'>
            <h2>My Applications</h2>
            <Link to='/applications/new'>
              <Button>New Application</Button>
            </Link>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className='shadow'>
          {claims.length > 0 &&
            claims
              .filter((claim) => claim.userId === user.userId)
              .map((claim) => {
                return <ClaimComponent key={claim.claimId} claim={claim} />;
              })}
        </ListGroup>
      </Container>
    </>
  );
};
