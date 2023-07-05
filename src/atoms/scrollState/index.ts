import { atom } from "recoil";

export interface ScrollStateAtomType {
  page: "mypage" | "community" | "place" | "";
  position: number;
}

export const ScrollStateAtom = atom<ScrollStateAtomType>({
  key: "scrollState",
  default: { page: "", position: 0 },
});
