import { useQuery } from "react-query";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { boardLoadList } from "../../libs/apis/board/loadList";
import { BoardLoadListRequestType } from "../../types/board/loadList/request";

export const useBoardListQuery = ({ category }: BoardLoadListRequestType) => {
  return useQuery(
    ["boardListQuery", category],
    async () => {
      const data = await boardLoadList({ category: category }).then(
        (res) => res.data
      );
      return data;
    },
    genericQueryOptions
  );
};
