import { atom } from "recoil";

export const SearchStateAtom = atom<string>({
  key: "searchState",
  default: "",
});
