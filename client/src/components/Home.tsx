import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { NavbarComponent } from './Navbar';
import { StoreState } from '../reducers';

export const HomeComponent = () => {
  const authedUserSelector = (state: StoreState) => state.authedUser;
  const authedUser = useSelector(authedUserSelector);
  const claimsSelector = (state: StoreState) => state.claims;
  const claims = useSelector(claimsSelector);

  return (
    <>
      <NavbarComponent />
      <Container>
        <Jumbotron>
          <h1>TODO: Add/Style Home Page</h1>
        </Jumbotron>
        <Row className='flex-column'>
          {authedUser.isApprover ? (
            <Col>
              <h2>Welcome, {authedUser.username}</h2>
            </Col>
          ) : (
            <Col>
              <h2>Welcome, {authedUser.username}</h2>
              <h3>
                Annual Reimbursement Limit:{' '}
                {authedUser.annualReimbursement.toFixed(2)}
              </h3>
              <h3>
                Pending Reimbursements:{' '}
                {authedUser.pendingReimbursement.toFixed(2)}
              </h3>
              <h3>
                Awarded Reimbursements:{' '}
                {authedUser.awardedReimbursement.toFixed(2)}
              </h3>
              <h3>
                {`Available Reimbursements:
              ${(
                authedUser.annualReimbursement -
                authedUser.pendingReimbursement -
                authedUser.awardedReimbursement
              ).toFixed(2)}`}
              </h3>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
