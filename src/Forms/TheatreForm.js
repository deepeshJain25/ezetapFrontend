import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const TheatreForm = (props) => {
  const {
    showTheatreModal = false,
    handleClose = () => {},
    location = {},
    handleTheatres = () => {},
    theatresDetails = {},
  } = props;
  const [theatreData, setTheatreData] = useState(theatresDetails || {});

  // to save theatre info //
  const onSaveClick = () => {
    const clone = { ...theatreData };
    handleTheatres(clone, location.id);
    handleClose();
  };

  // to set state with initial value from props //
  useEffect(() => {
    setTheatreData(theatresDetails);
  }, [theatresDetails]);

  return (
    <div>
      <Modal
        size="lg"
        show={showTheatreModal}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Theatre details : {theatresDetails.name || "NA"}
            <br />
            (Add Theatre details and save changes to add more Theatres)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Theatre Name</Form.Label>
            <Form.Control
              defaultValue={theatresDetails.name}
              onChange={(e) => {
                setTheatreData((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              value={theatreData.theatre}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Location of Theatre</Form.Label>
            <Form.Control
              defaultValue={theatresDetails.location}
              onChange={(e) => {
                setTheatreData((prev) => {
                  return { ...prev, location: e.target.value };
                });
              }}
              value={theatreData.location}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price of Ticket</Form.Label>
            <Form.Control
              defaultValue={theatresDetails.price}
              onChange={(e) => {
                setTheatreData((prev) => {
                  return { ...prev, price: e.target.value };
                });
              }}
              value={theatreData.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Timings (Add times separated by Commas)</Form.Label>
            <Form.Control
              defaultValue={theatresDetails.shows || ""}
              onChange={(e) => {
                setTheatreData((prev) => {
                  return { ...prev, shows: e.target.value };
                });
              }}
              value={theatreData.shows}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              onSaveClick(theatreData, location);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TheatreForm;
