import React from "react";
import { Character } from "./types";

const CharacterCard = (props: {
  characterInfo: Character;
  handleToggle: Function;
  renderBans: boolean;
}) => {
  function getRarityStyle() {
    let styles = "";
    if (props.characterInfo.rarity !== -1) {
      styles += props.characterInfo.rarity === 5 ? "five-star" : "four-star";
    } else {
      styles += "default";
    }

    return styles;
  }

  function getCardStyle() {
    return !props.renderBans && !props.characterInfo.isOwned
      ? "character-card unowned"
      : "character-card";
  }

  return (
    <button
      className={getCardStyle()}
      onClick={() => props.handleToggle(props.characterInfo.char_id)}
    >
      <div className={`img-holder ${getRarityStyle()}`}>
        <img
          className="character-img"
          src={props.characterInfo.profile_img}
          alt={`${props.characterInfo.name}'s profile image.`}
        />
        <div className="character-name">{props.characterInfo.name}</div>
      </div>
    </button>
  );
};

export default CharacterCard;
