import React from "react";
import { FilterType } from "./types";

export default function Filter(props: {
  filterName: string;
  filterInfo: FilterType;
  setFilters: Function;
  currFilters: string[][];
}) {
  function handleClick() {
    props.setFilters(props.filterName, props.filterInfo.name);
  }

  function getSelected() {
    let index: number;
    if (props.filterName === "element") {
      index = 0;
    } else if (props.filterName === "weapon_type") {
      index = 1;
    } else if (props.filterName === "rarity") {
      index = 2;
    } else {
      index = 3;
    }

    return props.currFilters[index].includes(props.filterInfo.name);
  }

  return (
    <button
      className={getSelected() ? "filter selected" : "filter"}
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
