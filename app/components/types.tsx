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
  currentTeam: number;
};

export type FilterType = {
  id: number;
  name: string;
  img: string;
};

export enum State {
  Lock = 2,
  Pick = 1,
  Default = 0,
  Ban = -1,
  Use = -2,
}
