import axios from "axios";
import { CommentCreateRequestType } from "../../../../types/comment/create/request";
import { getCookie } from "../../../constants/cookie";

export const commentCreate = async ({
  boardId,
  comment,
}: CommentCreateRequestType) =>
  await axios.post(
    `${import.meta.env.VITE_BASE_URL}/comment/${boardId}`,
    { comment: comment },
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
