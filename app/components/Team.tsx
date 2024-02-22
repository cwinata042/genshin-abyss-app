import React from "react";
import CharacterList from "./CharacterList";
import { Character } from "./types";

export default function Team(props: {
  selectedChars: Character[][];
  selectedTeam: number;
  setSelectedTeam: Function;
  handleToggle: Function;
}) {
  const emptyFilters: string[][] = [[], [], [], []];

  function getStyles(team_num: number) {
    return props.selectedTeam === team_num
      ? `team team-${team_num} selected-team`
      : `team team-${team_num}`;
  }

  return (
    <div className="teams">
      <div className={getStyles(1)} onClick={() => props.setSelectedTeam(1)}>
        <p className="team-name">First Half</p>
        <CharacterList
          ownedCharacters={props.selectedChars[0]}
          currFilters={emptyFilters}
          handleToggle={props.handleToggle}
          renderBans={true}
        />
      </div>
      <div className={getStyles(2)} onClick={() => props.setSelectedTeam(2)}>
        <p className="team-name">Second Half</p>
        <CharacterList
          ownedCharacters={props.selectedChars[1]}
          currFilters={emptyFilters}
          handleToggle={props.handleToggle}
          renderBans={true}
        />
      </div>
    </div>
  );
}
