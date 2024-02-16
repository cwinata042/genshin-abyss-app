export type Character = {
  char_id: number;
  name: string;
  gender: string;
  rarity: number;
  element: string;
  weapon: string;
  region: string;
  profile_img: string;
  isOwned: boolean;
  state: string;
  teamPosition: number;
};

export type FilterType = {
  id: number;
  name: string;
  img: string;
};
