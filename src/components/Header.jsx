import { useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import NewMarkerModal from "./NewMarkerModal";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Company name</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Button variant="outline-info" onClick={handleModalOpen}>
            Add new ad
          </Button>
        </Container>
      </Navbar>
      <NewMarkerModal
        showModal={showModal}
        handleModalClose={handleModalClose}
      />
    </>
  );
}

export default Header;
