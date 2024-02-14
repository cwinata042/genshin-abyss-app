import React from "react";
import Filter from "./Filter";
import { FilterType } from "./types";
const { v4 } = require("uuid");

export default function FilterGroup(props: { filterGroupInfo: FilterType[] }) {
  const filterList = props.filterGroupInfo.map((filter) => {
    return <Filter key={v4()} filterInfo={filter} />;
  });

  return <div className="character-filter-group">{filterList}</div>;
}
