import { useState, useEffect } from 'react';

import CreateTask from '../components/CreateTask';
import UpdateTask from '../components/UpdateTask';
import Footer from '../components/Footer';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Form from 'react-bootstrap/esm/Form';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { RiDeleteBin5Fill } from "react-icons/ri";

import { deleteTask, updateStatus, getAllTasks } from '../services/api';

import logo from '../images/logo_orange.png'

function Home() {
  const [tasks, setTasks] = useState([])

  const handleStatusUpdate = (id) => {
    updateStatus(id)
    .then(function() {
      window.location.reload();
    })
    .catch(function() {
      console.log('failed')
    })
  }

  const handleDelete = (id) => {
    deleteTask(id)
    .then(function() {
      window.location.reload();
    })
    .catch(function() {
      console.log('failed')
    })
  }

  useEffect(() => {
    getAllTasks()
    .then(function(response) {
        setTasks(response.data)
    })
    .catch(function() {
      console.log('failed')
    })
  }, [])

  return (
    <>
      <Container className='text-center minHeight'>
        <img src={logo} alt='logo' className='logoSize mt-5' />
        <br />
        <CreateTask />
        <ListGroup>
          {
            tasks.map((task) =>
              <ListGroup.Item key={task.taskId} className='text-start p-3'>
                <Row>
                  <Col>
                    <h3>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          task.status === 'Incomplete'
                          ? <Tooltip>Mark Complete</Tooltip>
                          : <Tooltip>Mark Incomplete</Tooltip>}
                      >
                        <Form.Check
                          type='checkbox'
                          className='appOrange'
                          label={
                            task.status === 'Incomplete' ? task.title : <s>{task.title}</s>
                          }
                          checked={task.status === 'Incomplete' ? false : true}
                          onChange={() => handleStatusUpdate(task.taskId)}
                        />
                      </OverlayTrigger>
                    </h3>
                    <p>{(task.description).length < 100 ? task.description : (task.description).substr(0,100) + '...'}</p>
                    <small><i>Last Updated: {task.timestamp}</i></small>
                  </Col>
                  <Col className='text-end' xs={5} md={3} lg={2}>
                    <UpdateTask task={task} />
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete Task</Tooltip>}>
                      <Button
                        className='rounded-circle'
                        variant='dark'
                        onClick={() => handleDelete(task.taskId)}
                      ><RiDeleteBin5Fill /></Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          }
        </ListGroup>
      </Container>
      <Footer />
    </>
  );
}

export default Home;