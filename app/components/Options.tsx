import React from "react";
import { Character, FilterType } from "./types";
import Characters from "./Characters";

export default function Options(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
  toggleOptions: Function;
  setOwned: Function;
}) {
  const [ownedChars, setOwnedChars] = React.useState(props.allChars);

  function toggleOwned(char_id: number) {
    const newChars = ownedChars.map((character) => {
      if (character.char_id === char_id) {
        return {
          ...character,
          isOwned: !character.isOwned,
        };
      } else {
        return character;
      }
    });

    setOwnedChars(newChars);
  }

  return (
    <div className="options-overlay">
      <div className="options-window">
        <Characters
          ownedCharacters={ownedChars}
          elementData={props.elementData}
          weaponTypeData={props.weaponTypeData}
          handleToggle={toggleOwned}
          renderBans={false}
        />
        <div className="option-buttons">
          <button
            className="save-options"
            onClick={() => props.setOwned(ownedChars)}
          >
            SAVE
          </button>
          <button
            className="close-options"
            onClick={() => props.toggleOptions()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
