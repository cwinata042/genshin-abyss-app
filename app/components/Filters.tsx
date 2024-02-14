import React from "react";
import FilterGroup from "./FilterGroup";
import { FilterType } from "./types";

export default function Filters(props: {
  elementData: FilterType[];
  weaponTypeData: FilterType[];
  setFilters: Function;
}) {
  const rarityData: FilterType[] = [
    { id: 0, name: "5 star", img: "/icons/other/five-star-icon.svg" },
    { id: 1, name: "4 star", img: "/icons/other/four-star-icon.svg" },
  ];
  const genderData: FilterType[] = [
    {
      id: 0,
      name: "Male",
      img: "/icons/other/male-icon.svg",
    },
    {
      id: 1,
      name: "Female",
      img: "/icons/other/female-icon.svg",
    },
  ];

  return (
    <div className="character-filters">
      <FilterGroup
        filterName="element"
        filterGroupInfo={props.elementData}
        setFilters={props.setFilters}
      />
      <FilterGroup
        filterName="weapon_type"
        filterGroupInfo={props.weaponTypeData}
        setFilters={props.setFilters}
      />
      <FilterGroup
        filterName="rarity"
        filterGroupInfo={rarityData}
        setFilters={props.setFilters}
      />
      <FilterGroup
        filterName="gender"
        filterGroupInfo={genderData}
        setFilters={props.setFilters}
      />
    </div>
  );
}
