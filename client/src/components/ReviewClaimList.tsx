import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { StoreState } from '../reducers';
import { NavbarComponent } from './Navbar';
import { ClaimComponent } from './Claim';

export const ReviewClaimsComponent = () => {
  const claimsSelector = (state: StoreState) => state.claims;
  const claims = useSelector(claimsSelector);

  const authedUserSelector = (state: StoreState) => state.authedUser;
  const authedUser = useSelector(authedUserSelector);

  return (
    <>
      <NavbarComponent />
      <Container className='pb-4'>
        <ListGroup className='py-3'>
          <ListGroup.Item className='d-flex justify-content-between shadow p-4'>
            <h2>Review Applications</h2>
            <p className='lead'>{new Date().toLocaleDateString()}</p>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className='shadow'>
          {claims.length > 0 &&
            claims
              .filter((claim) => claim.needSupervisorApproval === true)
              .filter((claim) => claim.supervisorId === authedUser.userId)
              .map((claim) => {
                return <ClaimComponent key={claim.claimId} claim={claim} />;
              })}
          {claims.length > 0 && authedUser.isDepartmentHead
            ? claims
                .filter((claim) => claim.needDepartmentHeadApproval === true)
                .map((claim) => {
                  return <ClaimComponent key={claim.claimId} claim={claim} />;
                })
            : null}
          {claims.length > 0 && authedUser.isBenco
            ? claims
                .filter((claim) => claim.needBencoApproval === true)
                .map((claim) => {
                  return <ClaimComponent key={claim.claimId} claim={claim} />;
                })
            : null}
        </ListGroup>
      </Container>
    </>
  );
};
