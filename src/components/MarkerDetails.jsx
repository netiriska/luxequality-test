import { Button, Card } from "react-bootstrap";

const MarkerDetails = ({ selectedMarker }) => {
  if (!selectedMarker) {
    return <div>No ads selected</div>;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={require(`../../src/img/${selectedMarker.image}`)}
        alt="apartment photo"
        style={{ width: "auto", height: "250px" }}
      />
      <Card.Body>
        <Card.Title>{selectedMarker.popup}</Card.Title>
        <Card.Text>{selectedMarker.description}</Card.Text>
        <Card.Text style={{ fontWeight: "bold" }}>
          {selectedMarker.price}
        </Card.Text>
        <Button variant="outline-info">See details</Button>
      </Card.Body>
    </Card>
  );
};

export default MarkerDetails;
