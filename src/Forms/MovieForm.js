import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import TheatreForm from "./TheatreForm";
import "../style/movie-form.scss";
import axios from "axios";

const MovieForm = (props) => {
  const {
    movieData: {
      id: movieId = 0,
      genre = "",
      name = "",
      language = "",
      cast = "",
      theatres = {},
      location: movieLocations = [],
    } = {},
    fetchData,
    addMode,
    setAddMode,
  } = props;

  // refs //
  const locationRef = useRef("");
  const selectedTheathreDetails = useRef({});

  // states //
  const [movieData, setMovieData] = useState({});
  const [locations, setLocations] = useState([]);
  const [allTheatres, setAllTheatres] = useState(theatres);
  const [theatreInfo, setTheatreInfo] = useState("");
  const [showTheatreModal, setShowTheatreModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showAddLocationBtn, setShowAddLocationBtn] = useState(false);
  const [showAddTheatreBtn, setShowAddTheatreBtn] = useState(false);
  const [showAddTheatreInput, setShowAddTheatreInput] = useState(false);
  const [allGenres, setAllGenres] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState({});
  const [showError, setShowError] = useState({});

  // set states with initial values from props //
  useEffect(() => {
    setMovieData(props.movieData);
    setAllTheatres(theatres);
    setLocations(movieLocations);
  }, [props]);

  // clear form data when opening add new movie form //
  useEffect(() => {
    if (addMode) {
      setMovieData({});
    }
  }, [addMode]);

  // fetch all genres and locations to show in dropdowns //
  useEffect(() => {
    axios.get("http://localhost:4000/allGenres").then((res) => {
      setAllGenres(res.data);
    });
    axios.get("http://localhost:4000/allLocations").then((res) => {
      setAllLocations(res.data);
    });
  }, []);

  // to close theatre modal //
  const handleClose = () => setShowTheatreModal(false);

  // to close movie modal //
  const closeModal = () => {
    props.setShow(false);
    // setMovieData({});
    fetchData();
    setAddMode(false);
  };

  // to add details of theatres for a location //
  const handleShow = (loc) => {
    selectedTheathreDetails.current = loc;
    setShowTheatreModal(true);
  };

  // to add locations //
  const handleLocations = () => {
    setLocations((prev) => {
      if (
        prev.findIndex((locData) => locData.name === locationRef.current) === -1 // checking if selectetd location is already present
      ) {
        const newLocationObject = {
          id: prev.length + 1,
          name: locationRef.current,
        };
        const newLocs = [...prev, newLocationObject];
        setMovieData((prev) => {
          return { ...prev, location: newLocs };
        });
        return newLocs;
      }
      return prev;
    });
  };

  // to delete a theatre //
  const clearTheatre = (theatreData) => {
    const selectedLocationTheatres = allTheatres[selectedLocation.id];
    const newTheatreData = selectedLocationTheatres.filter(
      (th) => !(th.name === theatreData.name)
    );
    setAllTheatres((prev) => {
      prev[selectedLocation.id] = newTheatreData;
      setMovieData((prevData) => {
        prevData.theatres = prev;
        return prevData;
      });
      return { ...prev };
    });
  };

  // to save theatre details //
  const handleTheatres = (data, locationId) => {
    const indexOfTheatre = movieData.theatres[locationId].findIndex((th) => {
      return th.name === data.name;
    });
    setMovieData((prev) => {
      prev.theatres[locationId][indexOfTheatre] = data;
      return { ...prev };
    });
  };

  // to add theatres //
  const addTheatres = (locationId, name) => {
    setAllTheatres((prev) => {
      const clone = { ...prev };
      const locationData = clone[locationId];
      const theatreObj = { name: name };
      if (!locationData) {
        const theatreArray = [];
        theatreArray.push(theatreObj);
        clone[locationId] = theatreArray;
      } else {
        locationData.push(theatreObj);
        clone[locationId] = locationData;
      }
      setMovieData((prev) => {
        prev.theatres = clone;
        return { ...prev };
      });
      return clone;
    });

    setTheatreInfo("");
    setShowAddTheatreBtn(false);
  };

  const onLocationSelect = (locationDetail) => {
    setSelectedLocation(locationDetail);
    setShowAddTheatreInput(true);
  };

  const getLocationClass = (id) => {
    return id === selectedLocation.id
      ? "location-name location-name-selected"
      : "location-name";
  };

  // to update db with new movie details //
  const updateDb = (data, id) => {
    axios
      .post(`http://localhost:4000/updateMovie/${id}`, data)
      .then((res) => {
        console.log(res);
        setShowSuccessMessage({
          show: true,
          message: "Update Successful",
        });
        setTimeout(() => {
          setShowSuccessMessage({
            show: false,
          });
          closeModal();
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        setShowError({ show: true, message: e.message });
        setTimeout(() => {
          setShowError({ show: false });
        }, 5000);
      });
  };

  // to add new movie to db //
  const addToDb = (data) => {
    axios
      .post(`http://localhost:4000/addMovie`, data)
      .then((res) => {
        console.log(res);
        setShowSuccessMessage({
          show: true,
          message: "Successfully added movie",
        });
        setTimeout(() => {
          setShowSuccessMessage({ show: false });
          closeModal();
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        setShowError({ show: true, message: e.message });
        setTimeout(() => {
          setShowError({ show: false });
        }, 5000);
      });
  };

  return (
    <div>
      <Modal show={props.show} onHide={closeModal} backdrop="static" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of Movie</Form.Label>
              <Form.Control
                defaultValue={name || ""}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
                value={movieData.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Language</Form.Label>
              <Form.Control
                defaultValue={language || ""}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, language: e.target.value };
                  });
                }}
                value={movieData.language}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cast (Add names separated by Commas)</Form.Label>
              <Form.Control
                defaultValue={cast || ""}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, cast: e.target.value };
                  });
                }}
                value={movieData.cast}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                defaultValue={genre || "1"}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, genre: e.target.value };
                  });
                }}
              >
                <option value="">Open this select menu</option>
                {allGenres.map((genre) => {
                  return <option value={genre}>{genre}</option>;
                })}
              </Form.Select>
            </Form.Group>
            Locations: <br />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div style={{ display: "flex" }}>
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value.length !== 0) {
                      locationRef.current = e.target.value;
                      setShowAddLocationBtn(true);
                    } else {
                      setShowAddLocationBtn(false);
                    }
                  }}
                >
                  <option value="">Select a Location</option>
                  {allLocations.map((location) => {
                    return (
                      <option value={location.name}>{location.name}</option>
                    );
                  })}
                </Form.Select>
              </div>
            </Form.Group>
            <Button
              className="add-locations"
              onClick={handleLocations}
              variant="primary"
              disabled={!showAddLocationBtn}
            >
              Add Location
            </Button>
            <br />
            <br />
            {locations.map((loc) => (
              <div
                onClick={() => onLocationSelect(loc)}
                className={getLocationClass(loc.id)}
              >
                {loc.name}
              </div>
            ))}
            <br />
            <br />
            {showAddTheatreInput ? (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Add Theatres</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setTheatreInfo(e.target.value);
                      if (e.target.value.length !== 0) {
                        setShowAddTheatreBtn(true);
                      } else {
                        setShowAddTheatreBtn(false);
                      }
                    }}
                    value={theatreInfo}
                  />
                  <br />
                  <Button
                    className="add-locations"
                    onClick={() =>
                      addTheatres(selectedLocation.id, theatreInfo)
                    }
                    variant="primary"
                    disabled={!showAddTheatreBtn}
                  >
                    Add Theatre
                  </Button>
                </Form.Group>
              </>
            ) : null}
            {showAddTheatreInput ? (
              <>
                <h5>Theatre Details:</h5>
                {!allTheatres[selectedLocation.id] && (
                  <p style={{ color: "red" }}>No Theatres</p>
                )}
                {allTheatres[selectedLocation.id] &&
                  allTheatres[selectedLocation.id].map((theatreDetail) => {
                    return (
                      <div className="theatre-details-content">
                        <div className="theatre-name">{theatreDetail.name}</div>

                        <Button
                          onClick={() => handleShow(theatreDetail)}
                          size="sm"
                          className="theathre-action-btn"
                          variant="outline-primary"
                        >
                          Edit Details
                        </Button>
                        <Button
                          onClick={() => clearTheatre(theatreDetail)}
                          size="sm"
                          className="theathre-action-btn"
                          variant="outline-danger"
                        >
                          Clear
                        </Button>
                      </div>
                    );
                  })}
              </>
            ) : (
              <p>Please select a location to show theatres</p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {showSuccessMessage.show ? (
            <p style={{ color: "green", marginRight: "50px" }}>
              {showSuccessMessage.message}
            </p>
          ) : null}
          {showError.show ? (
            <p style={{ color: "red", marginRight: "50px" }}>
              {showError.message}, Please try again !
            </p>
          ) : null}
          <Button
            variant="primary"
            onClick={() => {
              if (addMode) {
                addToDb(movieData);
              } else {
                updateDb(movieData, movieId);
              }
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <TheatreForm
        showTheatreModal={showTheatreModal}
        handleClose={handleClose}
        location={selectedLocation}
        theatresDetails={selectedTheathreDetails.current}
        handleTheatres={handleTheatres}
      />
    </div>
  );
};

export default MovieForm;
