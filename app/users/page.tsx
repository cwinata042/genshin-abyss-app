import React from "react";

interface Character {
  char_id: number;
  name: string;
  element: string;
}

const UsersPage = async () => {
  const res = await fetch(
    "https://knbr-genshin-api.vercel.app/api/characters",
    { cache: "no-store" }
  );
  const characters: Character[] = await res.json();
  console.log(characters);

  return (
    <>
      <h1>Users</h1>
    </>
  );
};

export default UsersPage;
