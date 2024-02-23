import React from "react";
import { Character, FilterType, State } from "./types";
import Characters from "./Characters";
import Selector from "./Selector";
import Team from "./Team";

export default function Main(props: {
  allChars: Character[];
  elementData: FilterType[];
  weaponTypeData: FilterType[];
  setState: Function;
  togglePosition: Function;
  lockCharPositions: Function;
  confirmTeams: Function;
}) {
  // Keeps track of the currently selected team
  const [selectedTeam, setSelectedTeam] = React.useState(0);

  const defaultChar: Character = {
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
    currentTeam: -1,
  };

  // Creates the team based on the allChars characters' positions and current team
  // Replaces the old selectedChars state
  const selectedChars: Character[][] = getCurrTeams();

  // Gets number of selected non-default characters
  const selectedCharsCount = selectedChars
    .flat()
    .filter((char) => char.char_id !== -1).length;

  // Returns the current teams based on allChars in a Character[][]
  function getCurrTeams() {
    let currSelected: Character[][] = [[], []];

    for (let team = 0; team < 2; team++) {
      for (let pos = 0; pos < 4; pos++) {
        // Filter allChars for that team and pos
        let posChar: Character[] = props.allChars.filter(
          (char) => char.currentTeam === team && char.teamPosition === pos
        );

        // If filtered list has a character, add them
        // Else add a default character
        if (posChar.length !== 0) {
          currSelected[team][pos] = posChar[0];
        } else {
          currSelected[team][pos] = defaultChar;
        }
      }
    }

    return currSelected;
  }

  // Sorts the characters by the following:
  // Locked === Picked > Default > Banned > Used
  // Team Number > Team Position
  const sortedOwned = [...props.allChars]
    .sort((a, b) => {
      return a.teamPosition - b.teamPosition;
    })
    .sort((a, b) => {
      return a.currentTeam - b.currentTeam;
    })
    .sort((a, b) => {
      if (
        (a.state === State.Lock && b.state === State.Pick) ||
        (a.state === State.Pick && b.state === State.Lock)
      ) {
        return 0;
      } else {
        return b.state - a.state;
      }
    });

  function setLockedChars(lockedChars: number[]) {
    // Initialize list of new team position and current team
    let indices: number[] = [];
    let teams: number[] = [];

    for (let i = 0; i < lockedChars.length; i++) {
      // For first half of lockedChars list, add to 1st team
      // For second half of lockedChars list, add to 2nd team
      let team = i < lockedChars.length / 2.0 ? 0 : 1;
      let index = team === 0 ? i : i - Math.ceil(lockedChars.length / 2);

      // Add position to indeces
      indices.push(index);
      teams.push(team);
    }
    props.lockCharPositions(indices, teams, lockedChars);
  }

  // Attempts to toggle (add/remove) a character with char_id to the currently selected team
  function toggleSelectedChars(char_id: number) {
    // Finds the selected character
    const newChar: Character = props.allChars.filter((char) => {
      return char.char_id === char_id;
    })[0];

    // Determines if character is in selected or other team
    const otherTeam: number = selectedTeam === 0 ? 1 : 0;
    const foundSelected: boolean =
      selectedChars[selectedTeam].filter((char) => {
        return char.char_id === char_id;
      }).length === 1;
    const foundOther: boolean =
      selectedChars[otherTeam].filter((char) => {
        return char.char_id === char_id;
      }).length === 1;

    // Initializes new index of character
    let index: number;

    // Break if character is empty default
    // Or is banned or locked or already used
    // Or is in the other team
    if (
      char_id === -1 ||
      newChar.state === State.Ban ||
      newChar.state === State.Lock ||
      newChar.state === State.Use ||
      foundOther
    ) {
      return;
    } else if (!foundSelected) {
      // If not in selected team, find empty slot
      index = selectedChars[selectedTeam].findIndex((char) => {
        return char.char_id === -1;
      });

      // Break if there are no empty spots
      if (index === -1) {
        return;
      }
    } else {
      // If in selected team, find current spot
      index = selectedChars[selectedTeam].findIndex((char) => {
        return char.char_id === char_id;
      });
    }

    // Toggles the character's position in the team
    props.togglePosition(index, selectedTeam, char_id);
  }

  return (
    <div className="main">
      <Characters
        ownedCharacters={sortedOwned}
        elementData={props.elementData}
        weaponTypeData={props.weaponTypeData}
        handleToggle={toggleSelectedChars}
        renderBans={true}
      />
      <div className="team-builder">
        <Selector
          selectedChars={selectedChars}
          ownedCharacters={props.allChars}
          setState={props.setState}
          setLockedChars={setLockedChars}
        />
        <Team
          selectedChars={selectedChars}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          handleToggle={toggleSelectedChars}
        />
        {selectedCharsCount !== 0 && (
          <button
            className="confirm-teams"
            onClick={() => props.confirmTeams()}
          >
            Confirm Teams
          </button>
        )}
      </div>
    </div>
  );
}
