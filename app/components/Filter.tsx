import React from "react";
import { FilterType } from "./types";

export default function Filter(props: { filterInfo: FilterType }) {
  return (
    <button className="filter">
      <img
        className="filter-icon"
        src={props.filterInfo.img}
        alt={`${props.filterInfo.name} symbol.`}
      />
    </button>
  );
}
