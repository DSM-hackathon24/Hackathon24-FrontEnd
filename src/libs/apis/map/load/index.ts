import axios from "axios";
import { MapLoadRequestType } from "../../../../types/map/load/request";
import { MapLoadResponseType } from "../../../../types/map/load/response";
import { getCookie } from "../../../constants/cookie";

export const mapLoad = async ({ mapId }: MapLoadRequestType) =>
  await axios.get<MapLoadResponseType>(
    `${import.meta.env.VITE_BASE_URL}/map/list/${mapId}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
