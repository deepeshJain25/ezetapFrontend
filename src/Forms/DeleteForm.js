import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteForm = ({
  show,
  handleDelete,
  closeDelete,
  movie,
  isMovieDeleted,
}) => {
  return (
    <div>
      <Modal show={show} onHide={closeDelete} backdrop="static" size="lg">
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ color: "red", marginBottom: "20px" }}>
            Are you sure you want to delete : {movie} ?
          </h4>
          <Button
            variant="outline-danger"
            onClick={handleDelete}
            style={{ marginRight: "10px" }}
          >
            Yes
          </Button>
          <Button variant="outline-primary" onClick={closeDelete}>
            No
          </Button>
          <br />
          <br />

          {isMovieDeleted.confirmation ? (
            <h5 style={{ color: "blue" }}>Movie deleted Successfully</h5>
          ) : isMovieDeleted.message.length !== 0 ? (
            <h5 style={{ color: "red" }}>
              {isMovieDeleted.message}, Please Try Again !!
            </h5>
          ) : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteForm;
