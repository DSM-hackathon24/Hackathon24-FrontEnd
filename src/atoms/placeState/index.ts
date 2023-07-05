import { atom } from "recoil";
import { PlaceType } from "../../types/place/response";

export const PlaceStateAtom = atom<PlaceType[]>({
  key: "placeState",
  default: [],
});
