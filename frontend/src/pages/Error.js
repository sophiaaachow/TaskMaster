import Container from "react-bootstrap/esm/Container";

function Error() {
  return (
    <Container fluid className="minHeight parentContainer text-center">
      <Container className="childContainer">
        <h1 className="display-1 appOrange">
          <b>404</b>
        </h1>
        <h5>Page Not Found</h5>
        <p className="mt-4">Return to <a href="/" className="appOrange">Home</a></p>
      </Container>
    </Container>
  );
}

export default Error;