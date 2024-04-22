import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import geoIcon from "../icons/geo-icon.svg";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function Main() {
  const markers = [
    {
      id: 1,
      image: "../../src/img/Apartment 1",
      price: "UAH 10000",
      description: "Renting out a one-bedroom apartment",
      address: "Liubomyra Guzara Pros.",
      geocode: [50.438106, 30.419213],
      popup: "One-bedroom apartment",
    },
    {
      id: 2,
      image: "../../src/img/Apartment 2",
      price: "UAH 16000",
      description: "Renting out a three-bedroom apartment",
      address: "Vatslava Havela Blvd.",
      geocode: [50.446262, 30.419517],
      popup: "Three-bedroom apartment",
    },
    {
      id: 3,
      image: "../../src/img/Apartment 3",
      price: "UAH 13000",
      description: "Renting out a two-bedroom apartment",
      address: "Borshchahivska str.",
      geocode: [50.445644, 30.448527],
      popup: "Two-bedroom apartment",
    },
    {
      id: 4,
      image: "../../src/img/Apartment 4",
      price: "UAH 14500",
      description: "Renting out a studio apartment",
      address: "Vidradnyi Pros.",
      geocode: [50.435169, 30.43475],
      popup: "Studio apartment",
    },
    {
      id: 5,
      image: "../../src/img/Apartment 5",
      price: "UAH 15000",
      description: "Renting out a two-bedroom apartment",
      address: "Mykoly Vasylenka str.",
      geocode: [50.452638, 30.417393],
      popup: "Two-bedroom apartment",
    },
    {
      id: 6,
      image: "../../src/img/Apartment 6",
      price: "UAH 18500",
      description: "Renting out a three-bedroom apartment",
      address: "Vadyma Getmana str.",
      geocode: [50.452059, 30.444946],
      popup: "Three-bedroom apartment",
    },
    {
      id: 7,
      image: "../../src/img/Apartment 7",
      price: "UAH 16000",
      description: "Renting out a studio apartment",
      address: "Beresteyskyi Pros.",
      geocode: [50.452329, 30.467281],
      popup: "Studio apartment",
    },
    {
      id: 8,
      image: "../../src/img/Apartment 8",
      price: "UAH 9800",
      description: "Renting out a one-bedroom apartment",
      address: "Dehtiarivska str.",
      geocode: [50.463071, 30.454596],
      popup: "One-bedroom apartment",
    },
    {
      id: 9,
      image: "../../src/img/Apartment 9",
      price: "UAH 11500",
      description: "Renting out a one-bedroom apartment",
      address: "Zoolohichna str.",
      geocode: [50.460664, 30.463541],
      popup: "One-bedroom apartment",
    },
    {
      id: 10,
      image: "../../src/img/Apartment 10",
      price: "UAH 17500",
      description: "Renting out a studio apartment",
      address: "Moldovska str.",
      geocode: [50.459067, 30.467528],
      popup: "Studio apartment",
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
        <Col></Col>
      </Row>
    </Container>
  );
}
