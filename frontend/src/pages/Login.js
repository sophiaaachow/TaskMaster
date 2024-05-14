import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import Footer from "../components/Footer"
import Register from "../components/Register";
import AppSnackbar from '../components/AppSnackbar'

import logo from '../images/logo_orange.png'

import { login } from "../services/api";

import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    let data = {
      username: username,
      password: password
    }
    login(data)
    .then(function(response) {
      if (response.data === 'Failed') {
        setError("Username or password is incorrect.")
      } else {
        sessionStorage.setItem("auth", response.data.auth)
        sessionStorage.setItem("userId", response.data.userId)
        navigate("/home")
      }
    })
    .catch(function() {
      setOpen(true)
      setSeverity('error')
      setMessage('Login failed. Please try again.')
    })
  }

  useEffect(() => {
    document.title = 'Welcome to TaskMaster!';
  }, []);

  return (
    <>
      <Container fluid className="minHeight parentContainer text-center">
        <Container className="childContainer my-5">
          <h1 className="display-3"><b>Welcome to</b></h1>
          <img src={logo} alt='logo' className='logoSize' />
          <Container className="border mt-5 p-5 text-start" style={{width: '500px', maxWidth: '100%'}}>
            <h3>Login</h3>
            <hr />
            <Form onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}}>
              <Form.Group className='mb-3'>
                <Form.Label><h5>Username</h5></Form.Label>
                <Form.Control name="username" onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label><h5>Password</h5></Form.Label>
                <Form.Control name="password" type="password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <small className="text-danger">{error}</small>
              <div className="d-grid">
                <Button className='mt-3' size="lg" type="submit" variant="dark">
                  Login
                </Button>
              </div>
            </Form>
            <div className="text-center">
              <h5 className="mt-3">or</h5>
            </div>
            <Register setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />
          </Container>
        </Container>
      </Container>
      <Footer />
      <AppSnackbar setOpen={setOpen} open={open} severity={severity} message={message} />
    </>
  );
}

export default Login;