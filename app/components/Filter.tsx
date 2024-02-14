import React from "react";
import { FilterType } from "./types";

export default function Filter(props: {
  filterName: string;
  filterInfo: FilterType;
  setFilters: Function;
}) {
  const [isSelected, setIsSelected] = React.useState(false);

  function handleClick() {
    props.setFilters(props.filterName, props.filterInfo.name);
    setIsSelected((prevIsSelected) => !prevIsSelected);
  }

  return (
    <button
      className={isSelected ? "filter selected" : "filter"}
      onClick={handleClick}
    >
      <img
        className="filter-icon"
        src={props.filterInfo.img}
        alt={`${props.filterInfo.name} symbol.`}
      />
    </button>
  );
}
