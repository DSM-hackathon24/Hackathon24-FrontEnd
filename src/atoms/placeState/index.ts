import { atom } from "recoil";
import { PlaceResponseType } from "../../types/place/response";

export const PlaceStateAtom = atom<PlaceResponseType[]>({
  key: "placeState",
  default: [],
});
