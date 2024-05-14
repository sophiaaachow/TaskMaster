import UpdateTask from '../components/UpdateTask';

import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/esm/Form';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Button from 'react-bootstrap/esm/Button'
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

import { RiDeleteBin5Fill } from "react-icons/ri";

import { deleteTask, updateStatus } from '../services/api';

function Task(props) {

    const handleStatusUpdate = (id) => {
        updateStatus(id)
        .then(function() {
            window.location.reload();
        })
        .catch(function() {
            props.setOpen(true)
            props.setSeverity('error')
            props.setMessage('There was a problem updating status. Please try again.')
        })
        }

        const handleDelete = (id) => {
        deleteTask(id)
        .then(function() {
            window.location.reload();
        })
        .catch(function() {
            props.setOpen(true)
            props.setSeverity('error')
            props.setMessage('There was a problem deleting task. Please try again.')
        })
    }

  return (
        <ListGroup.Item key={props.task.taskId} className='text-start p-3'>
            <Row>
            <Col>
                <h3>
                <OverlayTrigger
                    placement="top"
                    overlay={
                    props.task.status === 'Incomplete'
                    ? <Tooltip>Mark Complete</Tooltip>
                    : <Tooltip>Mark Incomplete</Tooltip>}
                >
                    <Form.Check
                    type='checkbox'
                    className='appOrange'
                    label={
                        props.task.status === 'Incomplete' ? props.task.title : <s>{props.task.title}</s>
                    }
                    checked={props.task.status === 'Incomplete' ? false : true}
                    onChange={() => handleStatusUpdate(props.task.taskId)}
                    />
                </OverlayTrigger>
                </h3>
                <p>{(props.task.description).length < 100 ? props.task.description : (props.task.description).substr(0,100) + '...'}</p>
                <small><i>Last Updated: {props.task.timestamp}</i></small>
            </Col>
            <Col className='text-end' xs={5} md={3} lg={2}>
                <UpdateTask task={props.task} setOpen={props.setOpen} setSeverity={props.setSeverity} setMessage={props.setMessage} />
                <OverlayTrigger placement="top" overlay={<Tooltip>Delete Task</Tooltip>}>
                <Button
                    className='rounded-circle'
                    variant='dark'
                    onClick={() => handleDelete(props.task.taskId)}
                ><RiDeleteBin5Fill /></Button>
                </OverlayTrigger>
            </Col>
            </Row>
        </ListGroup.Item>
      );
    }

export default Task;