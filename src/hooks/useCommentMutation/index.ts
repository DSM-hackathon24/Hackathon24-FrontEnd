import { useMutation, useQueryClient } from "react-query";
import { CommentLoadRequestType } from "../../types/comment/load/request";
import { commentCreate } from "../../libs/apis/comment/create";

export const useCommentMutation = ({ boardId }: CommentLoadRequestType) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["commentQuery", boardId],
    (comment: string) =>
      commentCreate({
        boardId: boardId,
        comment: comment,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["commentQuery", boardId]),
    }
  );
};
