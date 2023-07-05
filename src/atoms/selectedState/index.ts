import { atom } from "recoil";

export interface SelectedStateAtomType {
  id: number;
  x: number;
  y: number;
}

export const SelectedStateAtom = atom<SelectedStateAtomType>({
  key: "selectedState",
  default: {
    id: 0,
    x: 0,
    y: 0,
  },
});
