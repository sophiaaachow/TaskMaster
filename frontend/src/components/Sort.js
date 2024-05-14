import { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { getTasksByUser, getTasksByTime, getTasksByStatus } from '../services/api';

function Sort(props) {
    const [sort, setSort] = useState('Default')

    const sortByDefault = () => {
        getTasksByUser(sessionStorage.getItem("userId"))
        .then(function(response) {
            props.setTasks(response.data)
            setSort('Default')
        })
        .catch(function() {
            props.setOpen(true)
            props.setSeverity('error')
            props.setMessage('Task sorting failed. Please try again.')
        })
    }

    const sortByTime = (time) => {
        let data = {
            time: time,
            userId: sessionStorage.getItem("userId")
        }
        getTasksByTime(data)
        .then(function(response) {
            props.setTasks(response.data)
            setSort(time)
        })
        .catch(function() {
            props.setOpen(true)
            props.setSeverity('error')
            props.setMessage('Task sorting failed. Please try again.')
        })
    }

    const sortByStatus = (status) => {
        let data = {
            status: status,
            userId: sessionStorage.getItem("userId")
        }
        getTasksByStatus(data)
        .then(function(response) {
            props.setTasks(response.data)
            setSort(status)
        })
        .catch(function() {
            props.setOpen(true)
            props.setSeverity('error')
            props.setMessage('Task sorting failed. Please try again.')
        })
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" className='rounded-pill'>
                Sort: {sort}
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
                <Dropdown.Item onClick={sortByDefault}>Default</Dropdown.Item>
                <Dropdown.Item onClick={() => sortByTime('Latest')}>Latest</Dropdown.Item>
                <Dropdown.Item onClick={() => sortByTime('Oldest')}>Oldest</Dropdown.Item>
                <Dropdown.Item onClick={() => sortByStatus('Incomplete')}>Incomplete</Dropdown.Item>
                <Dropdown.Item onClick={() => sortByStatus('Complete')}>Complete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        );
    }

export default Sort;