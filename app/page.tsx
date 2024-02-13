import CharacterList from "./components/CharacterList";

export default function App() {
  return (
    <main>
      <div className="wrapper">
        <div className="header">HEADER</div>
        <div className="main">
          <div className="characters">
            <CharacterList />
            <div className="character-filters">FILTERS</div>
          </div>
          <div className="team-builder">
            <div className="options">OPTIONS</div>
            <div className="teams">TEAMS</div>
          </div>
        </div>
      </div>
    </main>
  );
}
