import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { RiLogoutBoxRFill } from "react-icons/ri";

function Footer() {
  const navigate = useNavigate()

  const handleLogout = () => {
      navigate("/login")
      sessionStorage.removeItem("auth")
      sessionStorage.removeItem("userId")
  }

  return (
        <Container fluid className='footer p-2 bgOrange text-end'>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
            <Button onClick={handleLogout} className='rounded-circle' variant='outline-light'><RiLogoutBoxRFill /></Button>
          </OverlayTrigger>
        </Container>
      );
    }

export default Footer;