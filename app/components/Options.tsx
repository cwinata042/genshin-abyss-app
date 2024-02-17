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
  const [allSelected, setAllSelected] = React.useState(props.allChars.length);

  function toggleOwned(char_id: number) {
    let newSelected = 0;
    const newChars = ownedChars.map((character) => {
      if (character.isOwned && character.char_id !== char_id) {
        newSelected++;
      } else if (!character.isOwned && character.char_id === char_id) {
        newSelected++;
      }

      if (character.char_id === char_id) {
        return {
          ...character,
          isOwned: !character.isOwned,
        };
      } else {
        return character;
      }
    });

    setAllSelected(newSelected);
    setOwnedChars(newChars);
  }

  function toggleSave() {
    props.setOwned(ownedChars);
    props.toggleOptions();
  }

  function toggleAll() {
    let newChars;
    if (allSelected !== ownedChars.length) {
      newChars = ownedChars.map((character) => {
        return {
          ...character,
          isOwned: true,
        };
      });

      setAllSelected(ownedChars.length);
    } else {
      newChars = ownedChars.map((character) => {
        return {
          ...character,
          isOwned: false,
        };
      });

      setAllSelected(0);
    }

    setOwnedChars(newChars);
  }

  function getSelectButton() {
    return allSelected !== ownedChars.length ? "Select All" : "Deselect All";
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
          <button className="save-options" onClick={() => toggleSave()}>
            SAVE
          </button>
          <button className="close-options" onClick={() => toggleAll()}>
            {getSelectButton()}
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
