import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import geoIcon from "../icons/geo-icon.svg"

export default function Main() {
  const markers = [
    {
      key: "marker1",
      geocode: [50.4503206, 30.52413],
      popup: "1",
    },
    {
      key: "marker2",
      geocode: [50.4501132, 30.5341351],
      popup: "2",
    },
    {
      key: "marker3",
      geocode: [50.4505436, 30.5441161],
      popup: "3",
    },
  ];

  const customIcon = new Icon({
    iconUrl: geoIcon,
    iconSize: [38, 38],
  });

  return (
    <Container fluid={true}>
      <Row>
        <Col>Options</Col>
        <Col xs={8}>
          <MapContainer center={[50.4500336, 30.5241361]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
              <Marker position={marker.geocode} icon={customIcon}></Marker>
            ))}
          </MapContainer>
        </Col>
        <Col>Chosen options</Col>
      </Row>
    </Container>
  );
}
