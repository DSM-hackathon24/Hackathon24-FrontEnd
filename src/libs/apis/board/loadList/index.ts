import axios from "axios";
import { BoardLoadListRequestType } from "../../../../types/board/loadList/request";
import { BoardLoadListResponseType } from "../../../../types/board/loadList/response";
import { getCookie } from "../../../constants/cookie";

export const boardLoadList = async ({ category }: BoardLoadListRequestType) =>
  await axios.get<BoardLoadListResponseType[]>(
    `${import.meta.env.VITE_BASE_URL}/board/list${
      category !== undefined ? "/category" : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      params: {
        value:
          category === "나만 아는 안전 수칙"
            ? "Tips"
            : category === "든든한 안전 제품"
            ? "Products"
            : category === "심심 탈출 넘버원" && "Information",
      },
    }
  );
