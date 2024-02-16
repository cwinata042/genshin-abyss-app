"use client";

import React from "react";
import { Character, FilterType } from "./types";
import Header from "./Header";
import Main from "./Main";

export default function Container(props: {
  allCharData: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
}) {
  const [allChars, setAllChars] = React.useState(
    props.allCharData.map((char) => {
      return {
        ...char,
        isOwned: true,
        state: "Default",
        teamPosition: -1,
      };
    })
  );

  return (
    <div className="wrapper">
      <Header />
      <Main
        allChars={allChars}
        elementData={props.elementData}
        weaponTypeData={props.weaponTypeData}
      />
    </div>
  );
}
