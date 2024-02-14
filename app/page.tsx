import CharacterList from "./components/CharacterList";
import Filters from "./components/Filters";

export default function App() {
  return (
    <main>
      <div className="wrapper">
        <div className="header">HEADER</div>
        <div className="main">
          <div className="characters">
            <CharacterList />
            <Filters />
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
