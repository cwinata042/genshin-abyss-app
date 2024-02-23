import React from "react";
import { Character, State } from "./types";

const CharacterCard = (props: {
  characterInfo: Character;
  handleToggle: Function;
  renderBans: boolean;
  renderSelect: boolean;
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
    let styles = "";
    styles +=
      !props.renderBans && !props.characterInfo.isOwned
        ? "character-card unowned"
        : "character-card";

    return styles;
  }

  function getBanStyle() {
    let styles = "card";
    // Renders bans
    if (props.renderBans) {
      if (props.characterInfo.state === State.Ban) {
        styles += " ban";
      } else if (props.characterInfo.state === State.Lock) {
        styles += " lock";
      }
    }

    return styles;
  }

  function getTeamStyle() {
    let styles = "pick-";

    if (props.characterInfo.currentTeam === 0) {
      styles += "one";
    } else {
      styles += "two";
    }

    return styles;
  }

  const isPick =
    (props.characterInfo.state === State.Pick ||
      props.characterInfo.state === State.Lock) &&
    props.renderSelect &&
    props.renderBans;

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
      {props.characterInfo.state !== State.Default && (
        <div className={getBanStyle()}></div>
      )}
      {isPick && <div className={getTeamStyle()}></div>}
      {isPick && (
        <div className={`selected-team-${props.characterInfo.currentTeam}`}>
          {props.characterInfo.teamPosition + 1}
        </div>
      )}
    </button>
  );
};

export default CharacterCard;
