import React from "react";
import { Input } from "reactstrap";

const DropDown = (props) => {
  return (
    <Input
      onChange={(e) => props.handleChange(e, props.reference)}
      type="select"
      value={props.selectedValue}
    >
      <option value={""} selected={true}>
        Select a {props.type}
      </option>
      {props.data.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </Input>
  );
};

export default DropDown;
