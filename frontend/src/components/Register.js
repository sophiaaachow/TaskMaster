import { useState } from 'react';

import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';

import { checkUsername, register } from '../services/api';

function Register(props) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancel = () => {
    setShow(false)
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setUsernameError('')
    setPasswordError('')
    setConfirmPasswordError('')
  };

  const handleCheckUsername = () => {
    if (username.length === 0) {
      setUsernameError('Username cannot be blank.')
    } else {
      let data = {
        username: username
      }
      checkUsername(data)
      .then(function(response) {
        setUsernameError(response.data)
      })
      .catch(function() {
        props.setOpen(true)
        props.setSeverity('error')
        props.setMessage('Username availability check failed. Please try again.')
      })
    }
  }

  const handleCheckPassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.')
    } else if (!(/^[A-Za-z0-9]*$/.test(password))) {
      setPasswordError('Password can only contain letters and numbers.')
    } else {
      setPasswordError('')
    }
  }

  const handleCheckConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.')
    } else {
      setConfirmPasswordError('')
    }
  }

  const handleSubmit = (e) => {
    if (usernameError !== '' || passwordError !== '' || confirmPasswordError !== '') {
        e.preventDefault();
        e.stopPropagation();
    } else {
      let data = {
          username: username,
          password: password
      }
      register(data)
        .then(function() {
          handleClose()
          window.location.reload();
        })
        .catch(function() {
          props.setOpen(true)
          props.setSeverity('error')
          props.setMessage('Account creation failed. Please try again.')
        })
    }
  }

  return (
    <>
      <div className="d-grid">
        <Button className='mt-3' size="lg" variant="outline-dark" onClick={handleShow}>
          Sign Up
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Form onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}}>
          <Modal.Header className='bgOrange'>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label><h5>Username</h5></Form.Label>
              <Form.Control placeholder='Enter username...' onChange={e => {setUsername(e.target.value)}} onBlur={handleCheckUsername} />
              <Form.Text className='text-danger'>{usernameError}</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label><h5>Password</h5></Form.Label>
              <Form.Text>
                <ul>
                  <li>At least 8 characters long.</li>
                  <li>Only contain letters and numbers.</li>
                </ul>
              </Form.Text>
              <Form.Control type='password' placeholder='Enter password...' onChange={e => setPassword(e.target.value)} onBlur={handleCheckPassword} />
              <Form.Text className='text-danger'>{passwordError}</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label><h5>Confirm Password</h5></Form.Label>
              <Form.Control type='password' placeholder='Re-enter password...' onChange={e => setConfirmPassword(e.target.value)} onBlur={handleCheckConfirmPassword} />
              <Form.Text className='text-danger'>{confirmPasswordError}</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className='rounded-pill' variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className='rounded-pill' type="submit" variant="dark">
              Sign Up
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Register;