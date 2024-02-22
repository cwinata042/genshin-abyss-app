import React from "react";
import { Character, State } from "./types";
import CharacterCard from "./CharacterCard";
const { v4 } = require("uuid");

export default function Selector(props: {
  selectedChars: Character[][];
  ownedCharacters: Character[];
  setState: Function;
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
    state: State.Default,
    teamPosition: 0,
  };

  const [numChars, setNumChars] = React.useState("8");
  const [randomChars, setRandomChars] = React.useState<Number[]>(
    Array(Number(numChars)).fill(-1)
  );

  const totalOwned = props.ownedCharacters.filter((char) => {
    return char.isOwned && char.state === State.Default;
  }).length;

  // REPLACE WITH TOGGLE FUNCTION FROM MAIN
  function handleToggle() {}

  function handleRandomize() {
    if (Number(numChars) > totalOwned) {
      console.log("Not enough owned characters to randomize!");
      return;
    }

    setRandomChars([]);

    let newRanChars: Number[] = [];
    for (let i = 0; i < Number(numChars); i++) {
      let newRan = Math.floor(Math.random() * props.ownedCharacters.length);
      let newRanChar = props.ownedCharacters.filter((char) => {
        return char.char_id === newRan;
      });

      // If character already selected or is not owned or is banned/selected
      while (
        newRanChars.includes(newRan) ||
        !newRanChar[0].isOwned ||
        newRanChar[0].state !== State.Default
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

  function clearRandomize() {
    const newList = Array(Number(numChars)).fill(-1);
    setRandomChars(newList);
  }

  // FIX TO HANDLE TEAM
  // IF BAN: REMOVE
  // IF SELECT: ADD
  function handleConfirm(type: State) {
    props.setState(type, randomChars);

    clearRandomize();
  }

  function handleInvalidCharCount(e: HTMLTextAreaElement) {
    if (Number(e.value) > totalOwned) {
      e.value = String(totalOwned);
    }

    setNumChars(e.value);
  }

  // Creates Character List with random chars array
  const ranCharCards = randomChars.map((num, i) => {
    let ranChar;
    if (randomChars[0] !== -1) {
      ranChar = props.ownedCharacters.filter((char) => {
        return char.char_id === randomChars[i];
      })[0];
    } else {
      ranChar = defaultChar;
    }

    return (
      <CharacterCard
        characterInfo={ranChar}
        handleToggle={handleToggle}
        renderBans={true}
        key={v4()}
      />
    );
  });

  return (
    <div className="selector">
      <div className="selector-options">
        <label className="number-input-label">
          Number of Characters:
          <input
            className="number-input"
            type="number"
            min="1"
            max={totalOwned}
            value={numChars}
            onKeyUp={(e) =>
              handleInvalidCharCount(e.target as HTMLTextAreaElement)
            }
            onInput={(e) =>
              setNumChars((e.target as HTMLTextAreaElement).value)
            }
          ></input>
        </label>
        <div className="selector-buttons">
          <button className="randomize-button" onClick={handleRandomize}>
            Randomize
          </button>
          <button className="clear-button" onClick={clearRandomize}>
            Clear
          </button>
        </div>
      </div>
      <div className="random-character-list">{ranCharCards}</div>
      <div className="selector-confirm">
        <button className="ban-button" onClick={() => handleConfirm(State.Ban)}>
          Ban
        </button>
        <button
          className="lock-button"
          onClick={() => handleConfirm(State.Lock)}
        >
          Lock
        </button>
      </div>
    </div>
  );
}
