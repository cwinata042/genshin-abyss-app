import React from "react";
import { Character } from "./types";
import CharacterCard from "./CharacterCard";
const { v4 } = require("uuid");

export default function Selector(props: {
  selectedChars: Character[][];
  ownedCharacters: Character[];
}) {
  let defaultChar: Character = {
    char_id: -1,
    name: "--",
    gender: "None",
    rarity: -1,
    element: "None",
    weapon: "None",
    region: "None",
    profile_img: "/img/Default_Icon.svg",
    isOwned: true,
    state: "Default",
    teamPosition: 0,
  };

  const [randomChars, setRandomChars] = React.useState<Number[]>([]);
  const [numChars, setNumChars] = React.useState("8");

  // REPLACE WITH TOGGLE FUNCTION FROM MAIN
  function handleToggle() {}

  function handleRandomize() {
    setRandomChars([]);

    let newRanChars: Number[] = [];
    for (let i = 0; i < Number(numChars); i++) {
      let newRan = Math.floor(Math.random() * props.ownedCharacters.length);
      let newRanChar = props.ownedCharacters.filter((char) => {
        return char.char_id === newRan;
      });

      console.log(newRan);
      console.log(newRanChar);

      // If character already selected or is not owned or is banned/selected
      while (
        newRanChars.includes(newRan) ||
        !newRanChar[0].isOwned ||
        newRanChar[0].state !== "Default"
      ) {
        newRan = Math.floor(Math.random() * props.ownedCharacters.length);
        newRanChar = props.ownedCharacters.filter((char) => {
          return char.char_id === newRan;
        });
      }

      newRanChars.push(newRan);
    }
    setRandomChars(newRanChars);
  }

  // Creates Character List with random chars array
  const ranCharCards = randomChars.map((num, i) => {
    const ranChar = props.ownedCharacters.filter((char) => {
      return char.char_id === randomChars[i];
    });

    return (
      <CharacterCard
        characterInfo={ranChar[0]}
        handleToggle={handleToggle}
        renderBans={true}
        key={v4()}
      />
    );
  });

  return (
    <div className="selector">
      <button className="randomize-button" onClick={handleRandomize}>
        Randomize!
      </button>
      <label>
        Number of Characters:
        <input
          className="number-input"
          type="number"
          min="1"
          max="20"
          value={numChars}
          onInput={(e) => setNumChars((e.target as HTMLTextAreaElement).value)}
        ></input>
      </label>
      <div className="random-character-list">{ranCharCards}</div>
    </div>
  );
}
