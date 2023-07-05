import { atom } from "recoil";

export const CategoryStateAtom = atom<string>({
  key: "categoryState",
  default: "전체",
});
