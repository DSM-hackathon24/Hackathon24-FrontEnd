import axios from "axios";
import { getCookie } from "../../../constants/cookie";

export const mapCreate = async (map: MapCreateRequestType) =>
  await axios.post(
    `${import.meta.env.VITE_BASE_URL}/map`,
    {
      longitude: map.longitude,
      latitude: map.latitude,
      availability: map.availability,
      sortation: map.sortation,
      installation: map.installation,
      writer: map.writer,
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
