import { useState } from 'react';

import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';

import { createTask } from '../services/api';

function CreateTask(props) {
  const [validated, setValidated] = useState(false)
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancel = () => {
    setShow(false)
    setValidated(false)
    setTitle('')
    setDescription('')
  };

  const handleSubmit = (e) => {
    if (title === '') {
        e.preventDefault();
        e.stopPropagation();
    } else {
      let data = {
          title: title,
          description: description
      }
      createTask(data)
        .then(function() {
          handleClose()
          setValidated(false)
          window.location.reload();
        })
        .catch(function() {
          props.setOpen(true)
          props.setSeverity('error')
          props.setMessage('There was a problem creating task. Please try again.')
        })
    }
    setValidated(true)
  }

  return (
    <>
      <Button onClick={handleShow} className='rounded-pill' variant='dark'>New Task</Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Form noValidate validated={validated} onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}}>
          <Modal.Header className='bgOrange'>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label><h5>Title</h5></Form.Label>
              <Form.Control placeholder='Enter title...' onChange={e => setTitle(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please fill in the task title.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label><h5>Description</h5></Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder='Enter description...'
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className='rounded-pill' variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className='rounded-pill' type="submit" variant="dark">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreateTask;