import axios from "axios";
import { CommentLoadResponseType } from "../../../../types/comment/load/response";
import { CommentLoadRequestType } from "../../../../types/comment/load/request";
import { getCookie } from "../../../constants/cookie";

export const commentLoad = async ({ boardId }: CommentLoadRequestType) =>
  await axios.get<CommentLoadResponseType[]>(
    `${import.meta.env.VITE_BASE_URL}/comment/${boardId}/list`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accToken")}`,
      },
    }
  );
