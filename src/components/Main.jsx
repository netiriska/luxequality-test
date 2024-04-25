import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import geoIcon from "../icons/geo-icon.svg";
import "leaflet/dist/leaflet.css";
import NewMarkerModal from "./NewMarkerModal";
import MarkersDetails from "./MarkersDetails";

export default function Main() {
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const filterOptions = {
    price: ["All", "Under 10000", "10000-15000", "Over 15000"],
  };

  const mapRef = useRef(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    console.log("Selected Marker:", marker);
  };

  const resetSelectedMarker = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    fetch("/luxequality-test/markers.json")
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
      const boundMarkers = filteredMarkers.filter((marker) =>
        bounds.contains(marker.geocode)
      );
      setVisibleMarkers(boundMarkers);
      console.log("Visible Markers:", boundMarkers);
    };

    map.on("zoomend", updateVisibleMarkers);
    map.on("moveend", updateVisibleMarkers);
    map.on("click", resetSelectedMarker);
    map.on("movestart", resetSelectedMarker);

    updateVisibleMarkers();

    return () => {
      map.off("zoomend", updateVisibleMarkers);
      map.off("moveend", updateVisibleMarkers);
      map.off("click", resetSelectedMarker);
      map.off("movestart", resetSelectedMarker);
    };
  }, [filteredMarkers]);

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  useEffect(() => {
    setFilteredMarkers(
      markers.filter((marker) => {
        const price = parseFloat(marker.price);
        switch (selectedPrice) {
          case "Under 10000":
            return price < 10000;
          case "10000-15000":
            return price >= 10000 && price <= 15000;
          case "Over 15000":
            return price > 15000;
          default:
            return true;
        }
      })
    );
  }, [selectedPrice, markers]);

  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <h4 style={{ textAlign: "center" }}>Find Rental Ads Here</h4>{" "}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Search by price, UAH</Form.Label>
          <Form.Select
            aria-label="Search by price"
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            {filterOptions.price.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </Form.Select>
        </Col>
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
