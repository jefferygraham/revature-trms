import React, { SyntheticEvent, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { StoreState } from '../reducers';
import { updateClaim } from '../actions';
import { NavbarComponent } from './Navbar';

export const EditClaimPageComponent = () => {
  const claimSelector = (state: StoreState) => state.claims;
  const claims = useSelector(claimSelector);

  const { claimId } = useParams() as {
    claimId: string;
  };

  const claim = claims.filter((claim) => claim.claimId === claimId)[0];
  const [startDate, setStartDate] = useState(claim.startDate);
  const [location, setLocation] = useState(claim.location);
  const [description, setDescription] = useState(claim.description);
  const [justification, setJustification] = useState(claim.justification);
  const [gradingFormat, setGradingFormat] = useState(claim.gradingFormat);
  const [cost, setCost] = useState(claim.cost);
  const [type, setType] = useState(claim.type);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    const updatedClaim = {
      claimId: claim.claimId,
      userId: claim.userId,
      supervisorId: claim.supervisorId,
      startDate: claim.startDate,
      location,
      cost: Number(cost),
      description,
      justification,
      gradingFormat,
      type,
      status: claim.status,
      comments: claim.comments,
      submissionDate: claim.submissionDate,
      needSupervisorApproval: true,
      needDepartmentHeadApproval: false,
      needBencoApproval: claim.needBencoApproval,
      needMoreInfo: claim.needMoreInfo,
      projectedReimbursement: claim.projectedReimbursement,
    };
    dispatch(updateClaim(updatedClaim));
    history.push('/');
  };

  return (
    <>
      <NavbarComponent />
      <Container>
        <ListGroup className='py-3'>
          <ListGroup.Item className='d-flex justify-content-between shadow p-4'>
            {claim.status === 'approved' ? (
              <h2>Submit Documentation</h2>
            ) : (
              <h2>Edit Claim</h2>
            )}
            <p className='lead'>{new Date().toLocaleDateString()}</p>
          </ListGroup.Item>
        </ListGroup>
        <Form onSubmit={handleSubmit} className='shadow p-4 mt-2'>
          <Form.Group as={Row} controlId='claimStartDate'>
            <Form.Label column sm={3}>
              Start Date
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                readOnly={claim.status === 'approved'}
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(Number(e.target.value))}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimSchoolName'>
            <Form.Label column sm={3}>
              Location
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                readOnly={claim.status === 'approved'}
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimCourseName'>
            <Form.Label column sm={3}>
              Description
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                readOnly={claim.status === 'approved'}
                as='textarea'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimCourseName'>
            <Form.Label column sm={3}>
              Justification
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                readOnly={claim.status === 'approved'}
                as='textarea'
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimCourseType'>
            <Form.Label column sm={3}>
              Grading Format
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                readOnly={claim.status === 'approved'}
                as='select'
                value={gradingFormat}
                onChange={(e) => setGradingFormat(e.target.value)}
              >
                <option value='letter'>Letter</option>
                <option value='presentation'>Presentation</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimCourseCost'>
            <Form.Label column sm={3}>
              Course Cost
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                readOnly={claim.status === 'approved'}
                type='number'
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimCourseType'>
            <Form.Label column sm={3}>
              Course Type
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                readOnly={claim.status === 'approved'}
                as='select'
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value='universityCourse'>University Course</option>
                <option value='seminar'>Seminar</option>
                <option value='certPrep'>Certification Prep Class</option>
                <option value='cert'>Certification</option>
                <option value='techTraining'>Technical Training</option>
                <option value='other'>Other</option>
              </Form.Control>
            </Col>
          </Form.Group>

          {claim.status === 'approved' && (
            <Form.Group as={Row} controlId='claimCourseType'>
              <Form.Label column sm={3}>
                Upload Documentation
              </Form.Label>
              <Col sm={9}>
                <Form.File />
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row}>
            <Col sm={{ span: 9, offset: 3 }}>
              <Button variant='info' type='submit'>
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
