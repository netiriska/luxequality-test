import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import geoIcon from "../icons/geo-icon.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import MarkerDetails from "./MarkerDetails";

export default function Main() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    console.log("Selected Marker:", selectedMarker);
  }, [selectedMarker]);

  useEffect(() => {
    fetch("/markers.json")
      .then((response) => response.json())
      .then((result) => setMarkers(result.markers))
      .catch((error) => console.error("Error fetching markers:", error));
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
          {markers.length > 0 && (
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
                    eventHandlers={{
                      click: () => handleMarkerClick(marker),
                    }}
                  >
                    <Popup>{marker.popup}</Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          )}
        </Col>
        <Col>
          <MarkerDetails selectedMarker={selectedMarker} />
        </Col>
      </Row>
    </Container>
  );
}
