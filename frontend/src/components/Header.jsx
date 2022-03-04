
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <>

      <Navbar variant='dark' bg='primary' expand="lg" collapseOnSelect>
        <Container className='justify-content-center'>
          <Navbar.Brand >
            <i className="fas fa-briefcase pe-2"></i>
            Administrador Empresas
          </Navbar.Brand>
          {/* <LinkContainer to='/'>

          </LinkContainer> */}
          {/* 
          {userInfo && (
            <Navbar.Text className='pb-1'>
              Welcome back, {userInfo.name}
            </Navbar.Text>
          )}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {userInfo
            ? (
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to='/my_cafes'>
                    <Nav.Link><i className='fas fa-mug-hot pe-1' />My sites</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={newCafeHandler}><i className='fas fa-plus-circle pe-1' />New site</Nav.Link>
                  <LinkContainer to='/profile'>
                    <Nav.Link><i className='fas fa-user pe-1' />My profile</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={logoutHandler}><i className='fas fa-sign-out-alt pe-1' />Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            )
            : (
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to='/login'>
                    <Nav.Link><i className='fas fa-users pe-1' />Log In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link><i className='fas fa-user-plus pe-1' />Register</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            )
          } */}

        </Container>
      </Navbar>
    </>
  )
};

export default Header;
