import { atom } from "recoil";

export interface ClickLocationStateAtomType {
  x?: number;
  y?: number;
}

export const ClickLocationStateAtom = atom<ClickLocationStateAtomType>({
  key: "clickLocationState",
  default: {
    x: undefined,
    y: undefined,
  },
});
