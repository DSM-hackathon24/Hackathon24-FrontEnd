import axios from "axios";
import { MapLoadListResponseType } from "../../../../types/map/loadList/response";
import { getCookie } from "../../../constants/cookie";

export const mapLoadList = async () =>
  await axios.get<MapLoadListResponseType[]>(
    `${import.meta.env.VITE_BASE_URL}/map/list/all`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accToken")}`,
      },
    }
  );
