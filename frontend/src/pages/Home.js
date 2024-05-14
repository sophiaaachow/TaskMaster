import { useState, useEffect } from 'react';

import CreateTask from '../components/CreateTask';
import Task from '../components/Task';
import Footer from '../components/Footer';
import AppSnackbar from '../components/AppSnackbar'
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup';

import { getAllTasks } from '../services/api';

import logo from '../images/logo_orange.png'

function Home() {
  const [tasks, setTasks] = useState([])
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAllTasks()
    .then(function(response) {
        setTasks(response.data)
    })
    .catch(function() {
      setOpen(true)
      setSeverity('error')
      setMessage('There was a problem retrieving tasks. Please try again.')
    })
  }, [])

  return (
    <>
      <Container className='text-center minHeight'>
        <img src={logo} alt='logo' className='logoSize mt-5' />
        <Row className='p-5'>
          <Col className='text-end'>
            <CreateTask setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />
          </Col>
          <Col className='text-start'>
            <Sort setTasks={setTasks} setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />
          </Col>
        </Row>
        <ListGroup>
          {(tasks.slice(page * 10, page * 10 + 10)).map((task) =>
              <Task key={task.taskId} task={task} setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />
          )}
        </ListGroup>
        {
          tasks.length > 0
          ?
          <Pagination tasks={tasks} page={page} setPage={setPage} />
          :
          <></>
        }
      </Container>
      <Footer />
      <AppSnackbar setOpen={setOpen} open={open} severity={severity} message={message} />
    </>
  );
}

export default Home;