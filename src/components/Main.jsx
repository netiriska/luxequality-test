import { Col, Container, Row } from "react-bootstrap";

export default function Main() {
  return (
    <Container fluid={true}>
      <Row>
        <Col>Options</Col>
        <Col xs={8}>Map</Col>
        <Col>Chosen options</Col>
      </Row>
    </Container>
  );
}
