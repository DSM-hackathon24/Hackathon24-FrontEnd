import { atom } from "recoil";

export interface CategoryStateAtomType {
  categoryResponses: string[];
  category: string;
}

export const CategoryStateAtom = atom<CategoryStateAtomType>({
  key: "categoryState",
  default: { categoryResponses: [], category: "전체" },
});
