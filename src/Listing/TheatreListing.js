import React from "react";
import "../style/theatre-listing.scss";

const TheatreListing = ({
  data: { name = "", location = "", price = "", shows = "" },
  index,
}) => {
  return (
    <div className="movie-flex theatre-listing-container">
      <div className="theatre-listing-index">
        <span>{index + 1}.</span>
      </div>
      <div className="theatre-listing-name">
        <span>
          {name}{" "}
          {location ? (
            <b>({location})</b>
          ) : (
            <b style={{ color: "red" }}>(NA)</b>
          )}
        </span>
      </div>
      <div className="theatre-listing-price">
        {price !== "" ? (
          <span>
            {"Rs. "}
            {price}
          </span>
        ) : (
          <p style={{ color: "red" }}>NA</p>
        )}
      </div>
      <div className="theatre-listing-shows">
        {!shows ? (
          <p style={{ color: "red" }}>NA</p>
        ) : (
          shows.split(",").map((showTiming, i) => {
            return (
              <div className="theatre-listing-timing" key={i}>
                <span>{showTiming} hrs</span>
              </div>
            );
          })
        )}
      </div>
      {}
    </div>
  );
};

export default TheatreListing;
