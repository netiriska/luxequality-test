import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import geoIcon from "../icons/geo-icon.svg";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function Main() {
  const markers = [
    {
      key: "marker1",
      geocode: [50.4503206, 30.52413],
      popup: "Apartment 1",
    },
    {
      key: "marker2",
      geocode: [50.4501132, 30.5341351],
      popup: "Apartment 2",
    },
    {
      key: "marker3",
      geocode: [50.4505436, 30.5441161],
      popup: "Apartment 3",
    },
  ];

  const customIcon = new Icon({
    iconUrl: geoIcon,
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

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

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {markers.map((marker) => (
                <Marker
                  key={marker.key}
                  position={marker.geocode}
                  icon={customIcon}
                >
                  <Popup>{marker.popup}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </Col>
        <Col>Chosen options</Col>
      </Row>
    </Container>
  );
}
