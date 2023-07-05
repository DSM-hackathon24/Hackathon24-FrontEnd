import { useMutation, useQueryClient } from "react-query";
import { boardCreate } from "../../libs/apis/board/create";
import { BoardCreateRequestType } from "../../types/board/create/request";

export const useBoardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["boardListQuery"],
    (board: BoardCreateRequestType) => boardCreate(board),
    {
      onSuccess: () => queryClient.invalidateQueries(["boardListQuery"]),
    }
  );
};
