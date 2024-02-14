export type Character = {
  char_id: number;
  name: string;
  gender: string;
  rarity: number;
  element: string;
  weapon_type: string;
  region: string;
  profile_img: string;
  isVisible: boolean;
};

export type FilterType = {
  id: number;
  name: string;
  img: string;
};
