import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { customAlphabet } from 'nanoid';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { addClaim } from '../actions/';
import { StoreState } from '../reducers';
import { NavbarComponent } from './Navbar';

export const NewClaimComponent = () => {
  const [startDate, setStartDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [justification, setJustification] = useState('');
  const [gradingFormat, setGradingFormat] = useState('');
  const [cost, setCost] = useState('');
  const [type, setType] = useState('universityCourse');

  const userSelector = (state: StoreState) => state.authedUser;
  const user = useSelector(userSelector);

  const claimsSelector = (state: StoreState) => state.claims;
  const claims = useSelector(claimsSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    const alphabet =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const nanoid = customAlphabet(alphabet, 7);

    const claim = {
      claimId: nanoid(),
      userId: user.userId,
      supervisorId: user.supervisorId,
      startDate: Date.parse(startDate),
      location,
      cost: Number(cost),
      projectedReimbursement: Number(cost) * reimbursementCoverage(type),
      description,
      justification,
      gradingFormat,
      type,
      status: 'pending',
      comments: [],
      submissionDate: Date.now(),
      needMoreInfo: false,
      needSupervisorApproval: true,
      needDepartmentHeadApproval: false,
      needBencoApproval: false,
    };
    dispatch(addClaim(claim));
    claims.push(claim);
    history.push('/applications');
  };

  const reimbursementCoverage = (type: string) => {
    switch (type) {
      case 'universityCourse':
        return 0.8;
      case 'seminar':
        return 0.6;
      case 'certPrep':
        return 0.75;
      case 'cert':
        return 1;
      case 'techTraining':
        return 0.9;
      case 'other':
        return 0.3;
      default:
        return 0;
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className='pb-4'>
        <ListGroup className='py-3'>
          <ListGroup.Item className='d-flex justify-content-between shadow p-4'>
            <h2>Reimbursement Application</h2>
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
                required
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimSchoolName'>
            <Form.Label column sm={3}>
              Location
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                required
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
                required
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
                required
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
                required
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
                required
                type='number'
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='claimCourseType'>
            <Form.Label column sm={3}>
              Course Type
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                required
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

          <Form.Group as={Row} controlId='claimSchoolName'>
            <Form.Label column sm={3}>
              Projected Reimbursement
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as='textarea'
                readOnly
                value={Number(
                  Number(cost) * reimbursementCoverage(type)
                ).toFixed(2)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 9, offset: 3 }}>
              <Button type='submit'>Submit Application</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
