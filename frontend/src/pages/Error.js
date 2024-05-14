import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

function Error() {
  const navigate = useNavigate()
  
  const toLogin = () => {
    navigate("/login")
    sessionStorage.removeItem("auth")
    sessionStorage.removeItem("userId")
}

  useEffect(() => {
    document.title = '404 Page Not Found';
  }, []);

  return (
    <Container fluid className="minHeight parentContainer text-center">
      <Container className="childContainer">
        <h1 className="display-1 appOrange">
          <b>404</b>
        </h1>
        <h5>Page Not Found</h5>
        <Button onClick={toLogin} className="mt-3" variant="dark">Return to Login</Button>
      </Container>
    </Container>
  );
}

export default Error;