import Characters from "./components/Characters";
import { Character } from "./components/types";

async function fetchCharacters() {
  const res = await fetch(`https://knbr-genshin-api.vercel.app/api/characters`);
  const characterData: Character[] = await res.json();

  return characterData;
}

export default async function App() {
  const allCharacters = await fetchCharacters();

  return (
    <main>
      <div className="wrapper">
        <div className="header">HEADER</div>
        <div className="main">
          <Characters ownedCharacters={allCharacters} />
          <div className="team-builder">
            <div className="options">OPTIONS</div>
            <div className="teams">TEAMS</div>
          </div>
        </div>
      </div>
    </main>
  );
}
