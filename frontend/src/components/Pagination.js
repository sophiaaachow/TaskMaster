import Button from 'react-bootstrap/esm/Button'
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'

import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function Pagination(props) {
  return (
        <ButtonGroup className='mt-5 bg-dark'>
            <OverlayTrigger placement="top" overlay={<Tooltip>Go to first page</Tooltip>}>
                <Button
                    variant="dark"
                    disabled={props.page === 0}
                    onClick={() => props.setPage(0)}
                >
                    <FiChevronsLeft />
                </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Go to previous page</Tooltip>}>
                <Button
                    variant="dark"
                    disabled={props.page - 1 < 0}
                    onClick={() => props.setPage(props.page - 1)}
                >
                    <FiChevronLeft />
                </Button>
            </OverlayTrigger>
            <Button
                disabled
                variant='dark'
            >
                Page {props.page + 1} of {Math.ceil(props.tasks.length / 10)}
            </Button>
            <OverlayTrigger placement="top" overlay={<Tooltip>Go to next page</Tooltip>}>
                <Button
                    variant="dark"
                    disabled={props.page + 1 > Math.ceil(props.tasks.length / 10) - 1}
                    onClick={() => props.setPage(props.page + 1)}
                >
                    <FiChevronRight />
                </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Go to last page</Tooltip>}>
                <Button
                    variant="dark"
                    disabled={props.page === Math.ceil(props.tasks.length / 10) - 1}
                    onClick={() => props.setPage(Math.ceil(props.tasks.length / 10) - 1)}
                >
                    <FiChevronsRight />
                </Button>
            </OverlayTrigger>
        </ButtonGroup>
      );
    }

export default Pagination;