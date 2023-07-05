import { useQuery } from "react-query";
import { mapLoadList } from "../../libs/apis/map/loadList";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";

export const useMapListQuery = () => {
  return useQuery(
    ["mapListQuery"],
    async () => {
      const data = await mapLoadList().then((res) => res.data);
      return data;
    },
    genericQueryOptions
  );
};
