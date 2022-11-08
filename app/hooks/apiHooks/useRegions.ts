import { useQuery } from "react-query";
import { RegionsService } from "../../services/info/regions.service";
import { IRegion } from "../../types/region-district.type";

export default function useRegions() {
  const { data, isLoading } = useQuery(
    "regions-list",
    () => RegionsService.getRegionsList(),
    {
      select: ({ data }) => {
        return data.map((item: IRegion) => ({
          ...item,
          label: item.name,
          value: item.id,
        }));
      },
    }
  );
  return {
    regionsList: data,
    isLoading,
  };
}
