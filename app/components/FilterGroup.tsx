import React from "react";
import Filter from "./Filter";
import { FilterType } from "./types";
const { v4 } = require("uuid");

export default function FilterGroup(props: {
  filterName: string;
  filterGroupInfo: FilterType[];
  setFilters: Function;
}) {
  const filterList = props.filterGroupInfo.map((filter) => {
    return (
      <Filter
        key={v4()}
        filterName={props.filterName}
        filterInfo={filter}
        setFilters={props.setFilters}
      />
    );
  });

  return <div className="character-filter-group">{filterList}</div>;
}
