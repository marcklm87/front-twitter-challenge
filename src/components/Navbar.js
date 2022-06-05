import React from 'react'
import { Container, Navbar, Nav} from 'react-bootstrap'

const NavbarMain = () => {
    return (
    <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/">Twitter Challenge</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default NavbarMain