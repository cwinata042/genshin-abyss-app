import React from "react";
import { FilterType } from "./types";

export default function Filter(props: {
  filterName: string;
  filterInfo: FilterType;
}) {
  const [isSelected, setIsSelected] = React.useState(false);

  function handleClick() {
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
