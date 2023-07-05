import { useQuery } from "react-query";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { commentLoad } from "../../libs/apis/comment/load";
import { CommentLoadRequestType } from "../../types/comment/load/request";

export const useCommentQuery = ({ boardId }: CommentLoadRequestType) => {
  return useQuery(
    ["commentQuery", boardId],
    async () => {
      const data = await commentLoad({ boardId: boardId }).then(
        (res) => res.data
      );
      return data;
    },
    genericQueryOptions
  );
};
