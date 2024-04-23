const MarkerDetails = ({ selectedMarker }) => {
  if (!selectedMarker) {
    return <div>No ads selected</div>;
  }

  return (
    <div>
      <h4>{selectedMarker.description}</h4>
      <p>{selectedMarker.price}</p>
      <img
        src={require(`../../src/img/${selectedMarker.image}`)}
        alt=""
        style={{ width: "150px", height: "200px" }}
        px
      />
    </div>
  );
};

export default MarkerDetails;
