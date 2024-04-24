import { Card } from "react-bootstrap";

const MarkerDetails = ({ marker }) => {
  if (!marker) {
    return <div>No ads selected</div>;
  }

  return (
    <Card className="mt-2" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={marker.image ? require(`../../src/img/${marker.image}`) : ""}
        alt="apartment photo"
        style={{ width: "auto", height: "250px" }}
      />
      <Card.Body>
        <Card.Title>{marker.popup}</Card.Title>
        <Card.Text>{marker.description}</Card.Text>
        <Card.Text style={{ fontWeight: "bold" }}>{marker.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MarkerDetails;
