import { useState } from 'react';

import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { RiEdit2Fill } from "react-icons/ri";
import { FaEllipsisH } from "react-icons/fa";

import { updateTask } from '../services/api';

function UpdateTask(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(props.task.title)
  const [description, setDescription] = useState(props.task.description)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancel = () => {
    setEditing(false)
    setValidated(false)
  };

  const handleSubmit = (e) => {
    if (title === '') {
        e.preventDefault();
        e.stopPropagation();
    } else {
      let data = {
          id: props.task.taskId,
          title: title,
          description: description
      }
      updateTask(data)
        .then(function() {
          handleClose()
          setValidated(false)
          window.location.reload();
        })
        .catch(function() {
          props.setOpen(true)
          props.setSeverity('error')
          props.setMessage('There was a problem updating task. Please try again.')
        })
    }
    setValidated(true)
  }

  return (
    <>
      <OverlayTrigger placement="top" overlay={<Tooltip>View Details</Tooltip>}>
        <Button onClick={handleShow} className='rounded-circle me-2' variant='dark'><FaEllipsisH /></Button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header className='bgOrange justify-content-between'>
            <Modal.Title>Task Details</Modal.Title>
            <OverlayTrigger placement="top" overlay={<Tooltip>Update Task</Tooltip>}>
              <Button onClick={() => setEditing(true)} className='rounded-circle me-2' variant='dark'><RiEdit2Fill /></Button>
            </OverlayTrigger>
          </Modal.Header>
          <Form noValidate validated={validated} onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}}>
          <Modal.Body>
            {
              editing
              ?
              <>
                <Form.Group className='mb-3'>
                  <Form.Label><h5>Title</h5></Form.Label>
                  <Form.Control
                    placeholder='Enter title...'
                    defaultValue={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please fill in the task title.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label><h5>Description</h5></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder='Enter description...'
                    defaultValue={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </Form.Group>
              </>
              :
              <>
                <p><small><i>{props.task.status}</i></small></p>
                <h3 className='appOrange'>{title}</h3>
                <p>{description}</p>
                <small><i>Last Updated: {props.task.timestamp}</i></small>
              </>
            }
          </Modal.Body>
          <Modal.Footer>
            {
              editing
              ?
              <>
                <Button className='rounded-pill' variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className='rounded-pill' type="submit" variant="dark">
                  Update
                </Button>
              </>
              :
              <Button className='rounded-pill' variant="dark" onClick={handleClose}>
                Close
              </Button>
            }
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateTask;