import React from "react";
import { Character } from "./types";

const CharacterCard = (props: { characterInfo: Character }) => {
  function getStyle() {
    if (props.characterInfo.rarity) {
      return props.characterInfo.rarity === 5 ? "five-star" : "four-star";
    } else {
      return "default";
    }
  }

  return (
    <button className="character-card">
      <div className="character-card-img">
        <div className={getStyle()}></div>
        <div className="triquetra"></div>
        <img
          className="character-img"
          src={props.characterInfo.profile_img}
          alt={`${props.characterInfo.name}'s profile image.`}
        />
      </div>
      <div className="character-name">{props.characterInfo.name}</div>
    </button>
  );
};

export default CharacterCard;
