import React from "react";
import { Character } from "./types";

const CharacterCard = () => {
  return (
    <button className="character-card">
      <div className="character-card-img">
        <div className="five-star"></div>
        <div className="triquetra"></div>
        <img
          className="character-img"
          src="https://genshin.honeyhunterworld.com/img/alhatham_078_icon.webp?x54247"
        />
      </div>
      <div className="character-name">Alhaitham</div>
    </button>
  );
};

export default CharacterCard;
