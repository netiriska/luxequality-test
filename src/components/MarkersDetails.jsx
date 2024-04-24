import { Card, Col, Row } from "react-bootstrap";
import MarkerDetails from "./MarkerDetails";

const MarkersDetails = ({ selectedMarker, visibleMarkers }) => {
  return (
    <div>
      {selectedMarker ? (
        <MarkerDetails marker={selectedMarker} />
      ) : (
        <>
          {visibleMarkers.map((marker) => (
            <MarkerDetails marker={marker} key={marker.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default MarkersDetails;
