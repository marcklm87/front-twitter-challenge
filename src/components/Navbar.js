import React from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Navbar, Nav, Button} from 'react-bootstrap'

const NavbarMain = () => {
    const history = useHistory();
    const handlerLogOut = (event) =>{
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('isadmin');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('islogin');
        // history.push('/');
        window.location.href = '/';
        console.log('cerrar sesion',sessionStorage.getItem('islogin'))         
    }
    return (
    <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/">Libreria</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/books">Books</Nav.Link>
            </Nav>
            <Button variant="outline-success" onClick={(event) => handlerLogOut(event)}>Cerrar sesión</Button>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default NavbarMain