import Container from 'react-bootstrap/esm/Container';

import logo from '../images/logo_orange.png'

function Home() {
  return (
    <Container fluid className='text-center'>
      <img src={logo} width={500} alt='logo' />
    </Container>
  );
}

export default Home;