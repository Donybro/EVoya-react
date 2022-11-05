import { useQuery } from "react-query";
import { RegionsService } from "../../services/info/regions.service";
import { useState } from "react";
import { IRegion } from "../../types/region-district.type";

export default function useRegions() {
  const [regionsList, setRegionsList] = useState<IRegion[]>([]);
  const { isLoading } = useQuery(
    "regions-list",
    () => RegionsService.getRegionsList(),
    {
      onSuccess: ({ data }) => {
        setRegionsList(data);
      },
    }
  );
  return {
    regionsList,
    isLoading,
  };
}
