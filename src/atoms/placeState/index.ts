import { atom } from "recoil";
import { MapLoadListResponseType } from "../../types/map/loadList/response";

export const PlaceStateAtom = atom<MapLoadListResponseType[]>({
  key: "placeState",
  default: [],
});
