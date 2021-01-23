import { SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser } from '../actions/authedUser';
import { StoreState } from '../reducers';
import { fetchClaims } from '../actions/claims';
import { fetchUsers } from '../actions/users';

export const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userSelector = (state: StoreState) => {
    console.log(state);
    return state.authedUser;
  };
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchClaims());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    let newUser: any = { ...user };
    newUser = { username, password };
    dispatch(getUser(newUser));
  };

  return (
    <Container
      id='login'
      className='vh-100 d-flex justify-content-center align-items-center'
      fluid
      style={{ backgroundImage: 'url(/images/books.png)' }}
    >
      <Row>
        <Col>
          <Card className='text-center shadow'>
            <Card.Header className='h4'>
              Tuition Reimbursement Management System
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='loginUsername'>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='text'
                      placeholder='Enter Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId='loginPassword'>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faKey} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Button variant='primary' type='submit' block>
                  LOGIN
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
