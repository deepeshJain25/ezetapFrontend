import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DropDown from "./DropDown";

const FilterAndSort = (props) => {
  const [filters, setFilters] = useState({});

  const handleChange = (e, ref) => {
    setFilters((prev) => {
      return { ...prev, [ref]: e.target.value };
    });
  };

  const handleApply = (data) => {
    const { lang, loc, genre, sort } = data;
    props.handleFilters({ lang, loc, genre, sort });
  };

  const clear = () => {
    props.handleFilters({
      lang: "",
      loc: "",
      genre: "",
      sort: "",
    });

    setFilters({
      lang: "",
      loc: "",
      genre: "",
      sort: "",
    });
  };

  return (
    <div className="filter-section">
      <div className="filter-by">
        <h4 className="txt">Filter By</h4>
        <div className="filter-select">
          <DropDown
            handleChange={(e) => handleChange(e, "loc")}
            type="Location"
            data={props.locs}
            selectedValue={filters.loc}
          />
          <DropDown
            handleChange={(e) => handleChange(e, "genre")}
            type="Genre"
            data={props.genres}
            selectedValue={filters.genre}
          />
          <DropDown
            handleChange={(e) => handleChange(e, "lang")}
            type="Language"
            data={props.langs}
            selectedValue={filters.lang}
          />
        </div>
      </div>
      <div className="sort-by">
        <h4 className="text">Sort By</h4>
        <DropDown
          handleChange={(e) => handleChange(e, "sort")}
          type="Sort"
          data={["Language", "Name"]}
          selectedValue={filters.sort}
        />
      </div>
      <div className="filter-button">
        <Button
          onClick={() => {
            handleApply(filters);
          }}
          variant="primary"
          className="apply-btn"
        >
          Apply Filters
        </Button>
        <Button
          onClick={() => {
            clear();
          }}
          variant="success"
          className="clear-btn"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterAndSort;
