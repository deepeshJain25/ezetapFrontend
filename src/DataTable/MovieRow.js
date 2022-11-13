import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LocationContext } from "../Contexts/LocationContext";
import { Input } from "reactstrap";

const MovieRow = ({ movieDetail, handleEdit, handleDelete }) => {
  const history = useHistory();
  const {
    name = "",
    cast = "",
    genre = "",
    language = "",
    location = [],
  } = movieDetail;
  const [showButton, setShowButton] = useState(false);
  const [rowLocation, setRowLocation] = useState("");

  const { setLocation } = useContext(LocationContext);

  const showMovie = () => {
    history.push(`/movie?${name}`);
  };

  useEffect(() => {
    if (rowLocation !== "") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
    setLocation(rowLocation);
  }, [rowLocation]);

  return (
    <tr>
      <td>{name}</td>
      <td>{cast}</td>
      <td>{language}</td>
      <td>{genre}</td>
      <td>
        <Input
          type="select"
          onChange={(e) => {
            setRowLocation(e.target.value);
          }}
        >
          <option value={""}>Select a Location</option>
          {location.map((loc) => (
            <option value={loc.name}>{loc.name}</option>
          ))}
        </Input>
      </td>
      <td>
        <Button
          onClick={showMovie}
          style={{ marginRight: "12px", padding: "10px 22px" }}
          disabled={!showButton}
        >
          View
        </Button>
        <Button
          onClick={() => handleEdit(name)}
          variant="info"
          style={{ marginRight: "12px", padding: "10px 22px" }}
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(name)}
          variant="danger"
          style={{ marginRight: "12px", padding: "10px 22px" }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default MovieRow;
