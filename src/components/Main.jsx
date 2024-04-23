import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import geoIcon from "../icons/geo-icon.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";

export default function Main() {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    fetch("/markers.json")
      .then((response) => response.json())
      .then((result) => setMarkers(result.markers));
  }, []);

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
                  key={marker.id}
                  position={marker.geocode}
                  icon={customIcon}
                >
                  <Popup>{marker.popup}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
