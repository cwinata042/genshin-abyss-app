import React from "react";
import CharacterList from "./CharacterList";
import { Character } from "./types";

export default function Team(props: {
  selectedChars: Character[][];
  handleToggle: Function;
}) {
  const emptyFilters: string[][] = [[], [], [], []];

  return (
    <div className="teams">
      <button className="team team-1">
        <p className="team-name">First Half</p>
        <CharacterList
          ownedCharacters={props.selectedChars[0]}
          currFilters={emptyFilters}
          handleToggle={props.handleToggle}
          renderBans={true}
        />
      </button>
      <button className="team team-2">
        <p className="team-name">Second Half</p>
        <CharacterList
          ownedCharacters={props.selectedChars[1]}
          currFilters={emptyFilters}
          handleToggle={props.handleToggle}
          renderBans={true}
        />
      </button>
    </div>
  );
}
