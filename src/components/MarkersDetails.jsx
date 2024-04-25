import MarkerDetails from "./MarkerDetails";

const MarkersDetails = ({ selectedMarker, visibleMarkers, selectedPrice }) => {
  const filteredMarkers = selectedPrice
    ? visibleMarkers.filter((marker) => {
        const price = parseFloat(marker.price.split(" ")[1]);
        switch (selectedPrice) {
          case "Under UAH10000":
            return price < 10000;
          case "UAH10000-15000":
            return price >= 10000 && price <= 15000;
          case "Over UAH15000":
            return price > 15000;
          default:
            return true;
        }
      })
    : visibleMarkers;

  return (
    <div>
      {selectedMarker ? (
        <MarkerDetails marker={selectedMarker} />
      ) : (
        <>
          {filteredMarkers.map((marker) => (
            <MarkerDetails marker={marker} key={marker.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default MarkersDetails;
