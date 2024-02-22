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
  state: State;
  teamPosition: number;
};

export type FilterType = {
  id: number;
  name: string;
  img: string;
};

export enum State {
  Lock = 2,
  Default = 1,
  Ban = 0,
}
