import React, { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

import { StoreState } from '../reducers';
import { updateClaim, updateUser } from '../actions';
import { NavbarComponent } from './Navbar';

export const ViewClaimPageComponent = () => {
  const claimsSelector = (state: StoreState) => {
    console.log(state);
    return state.claims;
  };
  const claims = useSelector(claimsSelector);

  const userSelector = (state: StoreState) => state.users;
  const users = useSelector(userSelector);

  const authedUserSelector = (state: StoreState) => state.authedUser;
  const authedUser = useSelector(authedUserSelector);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showRMI, setShowRMI] = useState(false);
  const handleRMIClose = () => setShowRMI(false);
  const handleShowRMIShow = () => setShowRMI(true);

  const [requestFrom, setRequestFrom] = useState('employee');

  const [noteInfo, setNoteInfo] = useState('');
  const handleAddNote = () => {
    const newNote = {
      author: authedUser.username,
      note: noteInfo,
      noteTime: new Date(Date.now()).toLocaleString(),
    };
    setNoteInfo('');
    claim.comments.push(newNote);
    dispatch(updateClaim(claim));
    handleClose();
    if (claim.status === 'denied') {
      history.push('/applications/review');
    }
  };

  const { claimId } = useParams() as {
    claimId: string;
  };

  const claim = claims.filter((claim) => claim.claimId === claimId)[0];

  const claimUser = users.filter((user) => user.userId === claim.userId)[0];

  const remaining =
    claimUser.annualReimbursement -
    claimUser.pendingReimbursement -
    claimUser.awardedReimbursement;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleApproveClick = () => {
    if (claim.needSupervisorApproval) {
      claim.needSupervisorApproval = false;
      claim.needDepartmentHeadApproval = true;
      dispatch(updateClaim(claim));
    } else if (claim.needDepartmentHeadApproval) {
      claim.needDepartmentHeadApproval = false;
      claim.needBencoApproval = true;
      dispatch(updateClaim(claim));
    } else if (claim.needBencoApproval) {
      claim.needBencoApproval = false;
      claim.status = 'approved';
      claimUser.pendingReimbursement += claim.projectedReimbursement;
      dispatch(updateClaim(claim));
      dispatch(updateUser(claimUser));
    }
    history.push('/applications/review');
  };

  const handleRequestMoreInfo = () => {
    switch (requestFrom) {
      case 'employee':
        claim.needSupervisorApproval = false;
        claim.needDepartmentHeadApproval = false;
        claim.needBencoApproval = false;
        dispatch(updateClaim(claim));
        break;
      case 'supervisor':
        claim.needSupervisorApproval = true;
        claim.needDepartmentHeadApproval = false;
        claim.needBencoApproval = false;
        dispatch(updateClaim(claim));
        break;
      case 'head':
        claim.needSupervisorApproval = false;
        claim.needDepartmentHeadApproval = true;
        claim.needBencoApproval = false;
        dispatch(updateClaim(claim));
        break;
      default:
        break;
    }
    history.push('/applications/review');
    handleRMIClose();
  };

  const handleDenial = () => {
    claim.status = 'denied';
    claim.needSupervisorApproval = false;
    claim.needDepartmentHeadApproval = false;
    claim.needBencoApproval = false;
    handleShow();
  };

  return (
    <>
      <NavbarComponent />
      <Container className='pb-4'>
        <ListGroup className='py-3'>
          <ListGroup.Item className='d-flex justify-content-between shadow p-4'>
            <div>
              <h2>View Claim</h2>
              {authedUser.userId === claimUser.userId && (
                <Link to={`/applications/${claimId}/edit`}>
                  <p>
                    <FontAwesomeIcon icon={faEdit} />
                  </p>
                </Link>
              )}
              {authedUser.isApprover && (
                <p onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} />
                </p>
              )}
            </div>
            <p className='lead'>{new Date().toLocaleDateString()}</p>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Application Id</strong>
              </Col>
              <Col lg={8}>{claim.claimId}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Name</strong>
              </Col>
              <Col>{claimUser.username}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Submission Date</strong>
              </Col>
              <Col>{new Date(claim.submissionDate).toLocaleDateString()}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Status</strong>
              </Col>
              <Col>{claim.status}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Start Date</strong>
              </Col>
              <Col>{new Date(claim.startDate).toLocaleDateString()}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Location</strong>
              </Col>
              <Col>{claim.location}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Description</strong>
              </Col>
              <Col>{claim.description}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <strong>Justification</strong>
              </Col>
              <Col>{claim.justification}</Col>
            </Row>
          </ListGroup.Item>
          {authedUser.isBenco && (
            <>
              <ListGroup.Item>
                <Row>
                  <Col lg={4}>
                    <strong>Projected Reimbursement</strong>
                  </Col>
                  <Col>{`$${claim.projectedReimbursement.toFixed(2)}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col lg={4}>
                    <strong>Annual Limit</strong>
                  </Col>
                  <Col>{`$${claimUser.annualReimbursement.toFixed(2)}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col lg={4}>
                    <strong>Awarded Reimbursement</strong>
                  </Col>
                  <Col>{`$${claimUser.awardedReimbursement.toFixed(2)}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col lg={4}>
                    <strong>Available Reimbursement</strong>
                  </Col>
                  <Col>{`$${remaining.toFixed(2)}`}</Col>
                </Row>
              </ListGroup.Item>
            </>
          )}
          <ListGroup.Item>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                    <p>View Notes</p>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <ListGroup variant='flush'>
                      {claim.comments.length > 0 &&
                        claim.comments.map((comment) => {
                          return (
                            <ListGroup.Item>
                              <strong>{comment.author}:</strong>
                              <p>{comment.note}</p>
                              <em>{comment.noteTime}</em>
                            </ListGroup.Item>
                          );
                        })}
                    </ListGroup>
                    {claim.comments.length < 0 && <p>No Notes Found</p>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </ListGroup.Item>
          {authedUser.isApprover && (
            <ListGroup.Item>
              <Row className='d-flex justify-content-center'>
                <Button className='mx-2' onClick={handleApproveClick}>
                  Approve
                </Button>
                <Button
                  variant='danger'
                  className='mx-2'
                  onClick={handleDenial}
                >
                  Deny
                </Button>
                <Button
                  variant='info'
                  className='mx-2'
                  onClick={handleShowRMIShow}
                >
                  Request More Information
                </Button>
              </Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId='claimCourseName'>
              <Col>
                <Form.Control
                  required
                  as='textarea'
                  value={noteInfo}
                  onChange={(e) => setNoteInfo(e.target.value)}
                />
              </Col>
            </Form.Group>
            <div>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handleAddNote}>
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showRMI} onHide={handleRMIClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request More Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId='claimCourseName'>
              <Form.Label>From:</Form.Label>
              <Form.Control
                as='select'
                value={requestFrom}
                onChange={(e) => setRequestFrom(e.target.value)}
              >
                <option value='employee'>Employee</option>
                {(claim.needDepartmentHeadApproval ||
                  claim.needBencoApproval) && (
                  <option value='supervisor'>Direct Supervisor</option>
                )}
                {claim.needBencoApproval && (
                  <option value='head'>Department Head</option>
                )}
              </Form.Control>
            </Form.Group>
            <div>
              <Button variant='secondary' onClick={handleRMIClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handleRequestMoreInfo}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
