import { useQuery } from "react-query";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { boardLoad } from "../../libs/apis/board/load";
import { BoardLoadRequestType } from "../../types/board/load/request";

export const useBoardQuery = ({ boardId }: BoardLoadRequestType) => {
  return useQuery(
    ["boardQuery", boardId],
    async () => {
      const data = await boardLoad({ boardId: boardId }).then(
        (res) => res.data
      );
      return data;
    },
    genericQueryOptions
  );
};
