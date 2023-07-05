import axios from "axios";
import { BoardLoadRequestType } from "../../../../types/board/load/request";
import { BoardLoadResponseType } from "../../../../types/board/load/response";
import { getCookie } from "../../../constants/cookie";

export const boardLoad = async ({ boardId }: BoardLoadRequestType) =>
  await axios.get<BoardLoadResponseType>(
    `${import.meta.env.VITE_BASE_URL}/board/detail/${boardId}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
