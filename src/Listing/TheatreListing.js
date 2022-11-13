import React from "react";
import '../style/theatre-listing.scss';

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
          <b style={{ color: "red" }}>(No location added)</b>
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
          <p style={{ color: "red" }}>No Price Added</p>
        )}
      </div>
      <div className="theatre-listing-shows">
        {!shows ? (
          <p style={{ color: "red" }}>No Shows Added</p>
        ) : (
          shows.split(",").map((showTiming) => {
            return (
              <div className="theatre-listing-timing">
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
