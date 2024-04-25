import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import geoIcon from "../icons/geo-icon.svg";
import "leaflet/dist/leaflet.css";
import NewMarkerModal from "./NewMarkerModal";
import MarkersDetails from "./MarkersDetails";

export default function Main() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const mapRef = useRef(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    console.log("Selected Marker:", marker);
  };

  const resetSelectedMarker = () => {
    setSelectedMarker(null);
  };

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

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const updateVisibleMarkers = () => {
      const bounds = map.getBounds();
      const filteredMarkers = markers.filter((marker) =>
        bounds.contains(marker.geocode)
      );
      setVisibleMarkers(filteredMarkers);
      console.log("Visible Markers:", filteredMarkers);
    };

    map.on("zoomend", updateVisibleMarkers);
    map.on("moveend", updateVisibleMarkers);
    map.on("click", resetSelectedMarker);

    updateVisibleMarkers();

    return () => {
      map.off("zoomend", updateVisibleMarkers);
      map.off("moveend", updateVisibleMarkers);
      map.off("click", resetSelectedMarker);
    };
  }, [markers]);

  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <h4 style={{ textAlign: "center" }}>Find Rental Ads Here</h4>{" "}
        </Col>
      </Row>
      <Row>
        <Col>Options</Col>
        <Col xs={8}>
          <MapContainer
            center={[50.4500336, 30.5241361]}
            zoom={13}
            ref={mapRef}
            onClick={resetSelectedMarker}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {visibleMarkers.map((marker) => (
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
        </Col>
        <Col>
          <NewMarkerModal markers={markers} setMarkers={setMarkers} />
          <MarkersDetails
            selectedMarker={selectedMarker}
            visibleMarkers={visibleMarkers}
          />
        </Col>
      </Row>
    </Container>
  );
}
