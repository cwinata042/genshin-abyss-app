import React from 'react'

interface Character {
    name: string;
    element: string;
}

const UsersPage = async () => {
  const res = await fetch("https://knbr-genshin-api.vercel.app/api/characters")
  const characters: Character[] = await res.json()

  return (
    <>
        <h1>Users</h1>
        <ul>{characters.map(character => <li>{character.name}</li>)}</ul>
    </>
  )
}

export default UsersPage