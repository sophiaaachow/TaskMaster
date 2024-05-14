import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateTask from '../components/CreateTask';
import Task from '../components/Task';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppSnackbar from '../components/AppSnackbar'
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';

import logo from '../images/logo_orange.png'

import { getTasksByUser } from '../services/api';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup';

function Home() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      getTasksByUser(sessionStorage.getItem("userId"))
      .then(function(response) {
        console.log(response.data)
        setTasks(response.data)
      })
      .catch(function() {
        setOpen(true)
        setSeverity('error')
        setMessage('Task retrieval failed. Please try again.')
      })
    } else {
      navigate("/login")
    }
  }, [navigate])

  return (
    <>
      <Header />
      <Container className='text-center minHeight mb-5'>
        <img src={logo} alt='logo' className='logoSize mt-5' />
        <Row className='p-5'>
          <Col className='text-end'>
            <CreateTask setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />
          </Col>
          <Col className='text-start'>
            <Sort setTasks={setTasks} setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />
          </Col>
        </Row>
        {
          tasks.length > 0
          ?
          <>
            <ListGroup>
              {(tasks.slice(page * 10, page * 10 + 10)).map((task) =>
                  <Task key={task.taskId} task={task} setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />
              )}
            </ListGroup>
            <Pagination tasks={tasks} page={page} setPage={setPage} />
          </>
          :
          <h1 className='display-5 text-muted'><i>You have no tasks!</i></h1>
        }
      </Container>
      <Footer />
      <AppSnackbar setOpen={setOpen} open={open} severity={severity} message={message} />
    </>
  );
}

export default Home;