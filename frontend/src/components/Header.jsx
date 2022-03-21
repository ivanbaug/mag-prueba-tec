import { Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <>
      <Navbar variant="dark" bg="primary" expand="lg" collapseOnSelect>
        <Container className="justify-content-center">
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-briefcase pe-2"></i>
              Administrador Empresas
            </Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
