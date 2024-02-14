import React from "react";
import FilterGroup from "./FilterGroup";
import { FilterType } from "./types";

export default async function Filters() {
  const resElement = await fetch(
    `https://knbr-genshin-api.vercel.app/api/elements`
  );
  const resWeapon = await fetch(
    `https://knbr-genshin-api.vercel.app/api/weapon-types`
  );

  const elementData: FilterType[] = await resElement.json();
  const weaponTypeData: FilterType[] = await resWeapon.json();
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
      <FilterGroup filterGroupInfo={elementData} />
      <FilterGroup filterGroupInfo={weaponTypeData} />
      <FilterGroup filterGroupInfo={rarityData} />
      <FilterGroup filterGroupInfo={genderData} />
    </div>
  );
}
