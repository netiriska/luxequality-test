import { Nav, Navbar, Container } from "react-bootstrap";
import logoIcon from "../icons/houses-fill.svg";

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoIcon} alt="logo" style={{paddingRight: "5px"}} /> RentHub
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
