// src/components/BsNavbar.jsx

import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";


function BsNavBar() {
    return <>
        <Navbar fixed="top" expand="md" className="bg-warning">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Acorn</Navbar.Brand>
            </Container>
        </Navbar>
    </>
}

export default BsNavBar;