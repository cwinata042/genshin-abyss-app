import Characters from "./components/Characters";
import { Character } from "./components/types";
import { FilterType } from "./components/types";
import Container from "./components/Container";

async function fetchCharacters() {
  const res = await fetch(`https://knbr-genshin-api.vercel.app/api/characters`);
  const characterData: Character[] = await res.json();

  return characterData;
}

async function fetchElements() {
  const resElement = await fetch(
    `https://knbr-genshin-api.vercel.app/api/elements`
  );
  const elementData: FilterType[] = await resElement.json();
  return elementData;
}

async function fetchWeaponTypes() {
  const resWeapon = await fetch(
    `https://knbr-genshin-api.vercel.app/api/weapon-types`
  );
  const weaponTypeData: FilterType[] = await resWeapon.json();
  return weaponTypeData;
}

export default async function App() {
  const allCharacters = await fetchCharacters();
  const elementData = await fetchElements();
  const weaponTypeData = await fetchWeaponTypes();

  return (
    <main>
      <Container
        allCharData={allCharacters}
        elementData={elementData}
        weaponTypeData={weaponTypeData}
      />
    </main>
  );
}
