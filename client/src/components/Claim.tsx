import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteClaim } from '../actions/';
import { StoreState } from '../reducers';

export const ClaimComponent = (props: any) => {
  const userSelector = (state: StoreState) => state.authedUser;
  const user = useSelector(userSelector);

  const usersSelector = (state: StoreState) => state.users;
  const users = useSelector(usersSelector);

  const claimUser = users.filter(
    (user) => user.userId === props.claim.userId
  )[0];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    handleShow();
  };

  const dispatch = useDispatch();

  const confirmDelete = (claimId: string) => {
    dispatch(deleteClaim(claimId));
    handleClose();
  };

  return (
    <>
      <ListGroup.Item>
        <Row className='align-items-center'>
          {user.isApprover ? (
            <Col>
              <Link to={`/applications/${props.claim.claimId}/view`}>
                <p>View</p>
              </Link>
            </Col>
          ) : (
            <Col>
              <p onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </p>
              <Link to={`/applications/${props.claim.claimId}/view`}>
                <p>View</p>
              </Link>
            </Col>
          )}
          <Col>{props.claim.claimId}</Col>
          <Col>
            <p>{claimUser.username}</p>
          </Col>
          <Col>
            <p>{props.claim.location}</p>
            <p>{props.claim.type}</p>
          </Col>
          <Col>{props.claim.status}</Col>
          <Col>{`$${props.claim.cost.toFixed(2)}`}</Col>
          <Col>{`$${props.claim.projectedReimbursement.toFixed(2)}`}</Col>
        </Row>
      </ListGroup.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className='p-0'>
          <Alert variant='danger' className='m-0'>
            <Alert.Heading>Cancel Request</Alert.Heading>
            <p>
              Are you sure you want to cancel this request. This action is not
              reversible.
            </p>

            <div className='text-center'>
              <Button
                className='mx-2'
                variant='secondary'
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className='mx-2'
                variant='danger'
                onClick={() => confirmDelete(props.claim.claimId)}
              >
                Delete
              </Button>
            </div>
          </Alert>
        </Modal.Body>
      </Modal>
    </>
  );
};
