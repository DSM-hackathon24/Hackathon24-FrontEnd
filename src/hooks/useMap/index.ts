import { useQuery } from "react-query";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { mapLoad } from "../../libs/apis/map/load";
import { MapLoadRequestType } from "../../types/map/load/request";

export const useMapQuery = ({ mapId }: MapLoadRequestType) => {
  return useQuery(
    ["mapQuery", mapId],
    async () => {
      const data = await mapLoad({ mapId: mapId }).then((res) => res.data);
      return data;
    },
    genericQueryOptions
  );
};
