import { Card, Col, Row } from "react-bootstrap";

const MarkerDetails = ({ selectedMarker, visibleMarkers }) => {
  return (
    <div>
      {selectedMarker ? (
        <Card style={{ width: "18rem", marginTop: "20px" }}>
          <Card.Img
            variant="top"
            src={
              selectedMarker && selectedMarker.image
                ? require(`../../src/img/${selectedMarker.image}`)
                : ""
            }
            alt="apartment photo"
            style={{ width: "auto", height: "250px" }}
          />
          <Card.Body>
            <Card.Title>{selectedMarker.popup}</Card.Title>
            <Card.Text>{selectedMarker.description}</Card.Text>
            <Card.Text style={{ fontWeight: "bold" }}>
              {selectedMarker.price}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {visibleMarkers.map((marker) => (
            <Col key={marker.id}>
              <Card
                style={{
                  width: "18rem",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                <Card.Img
                  variant="top"
                  src={
                    marker.image ? require(`../../src/img/${marker.image}`) : ""
                  }
                  alt="apartment photo"
                  style={{ width: "auto", height: "250px" }}
                />
                <Card.Body>
                  <Card.Title>{marker.popup}</Card.Title>
                  <Card.Text>{marker.description}</Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    {marker.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MarkerDetails;
