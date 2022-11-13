import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TheatreListing from "./TheatreListing";
import { LocationContext } from "../Contexts/LocationContext";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import "../style/theatre-listing.scss";

const MovieListing = () => {
  const history = useHistory();
  const { location } = useContext(LocationContext);
  const [data, setData] = useState([]);
  const movieName = history.location.search.slice(1);

  // to fetch theatre details from api //
  useEffect(() => {
    axios.get("http://localhost:4000/allMovies").then((res) => {
      const movieData = res.data.find((listing) => listing.name === movieName);
      const locationId = movieData.location.find(
        (loc) => loc.name === location
      ).id;
      const theatreData = movieData.theatres[locationId];
      setData(theatreData);
    });
  }, []);
  return (
    <Container>
      <div className="movie-info movie-listing">
        {data.length ? (
          <>
            <h3 className="movie-listing-title">
              Details of <b style={{ color: "green" }}>{movieName}</b> at{" "}
              <b style={{ color: "blue" }}>{location}</b>
            </h3>
            <div className="theatre-listing-main">
              <div className="theatre-listing-column-name">
                <div className="theatre-listing-index table-heading">Index</div>
                <div className="theatre-listing-name table-heading">
                  Theatre Name
                </div>
                <div className="theatre-listing-price table-heading">Price</div>
                <div className="theatre-listing-shows table-heading">Shows</div>
              </div>
              {data &&
                data.map((data, i) => {
                  return <TheatreListing data={data} index={i} />;
                })}
            </div>
          </>
        ) : (
          <h4 style={{ color: "red" }}>No Theatres added for this location.</h4>
        )}
      </div>

      <Button variant="secondary" onClick={() => history.goBack()}>
        Go Back
      </Button>
    </Container>
  );
};

export default MovieListing;
