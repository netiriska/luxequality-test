import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function NewMarkerModal({ markers, setMarkers }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [popup, setPopup] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  function handleCreateNewAd() {
    console.log(markers);

    const newMarker = {
      id: markers.length + 1,
      geocode: [parseFloat(latitude), parseFloat(longitude)],
      description: description,
      price: price,
      address: address,
      popup: popup,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    handleModalClose();
  }

  return (
    <>
      <Button variant="outline-info" onClick={handleModalOpen}>
        Add new ad
      </Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Ad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="newMarkerLatitude" className="col-form-label">
                Latitude:
              </label>
              <input
                type="text"
                className="form-control"
                id="newMarkerLatitude"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newMarkerLongitude" className="col-form-label">
                Longitude:
              </label>
              <input
                type="text"
                className="form-control"
                id="newMarkerLongitude"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newMarkerDescription" className="col-form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control"
                id="newMarkerDescription"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newMarkerPrice" className="col-form-label">
                Price:
              </label>
              <input
                type="number"
                className="form-control"
                id="newMarkerPrice"
                value={price}
                min="0"
                onChange={(event) => setPrice(event.target.valueAsNumber)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newMarkerAddress" className="col-form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="newMarkerAddress"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newMarkerPopup" className="col-form-label">
                Popup:
              </label>
              <input
                type="text"
                className="form-control"
                id="newMarkerPopup"
                value={popup}
                onChange={(event) => setPopup(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateNewAd}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
