import { useQuery } from "react-query";
import { RegionsService } from "../../services/info/regions.service";
import { useState } from "react";
import { IDistrict } from "../../types/DTO/region-district.type";

export default function useDistricts() {
  const [regionId, setRegionId] = useState<string>("");
  const { data, isLoading } = useQuery(
    ["districts-list", regionId],
    () => RegionsService.getDistrictsListByRegionId(regionId),
    {
      select: ({ data }) => {
        return data.map((item: IDistrict) => ({
          ...item,
          label: item.name,
          value: item.id,
        }));
      },
      enabled: !!regionId,
    }
  );
  return {
    setRegionId,
    districtsList: data,
    isLoading,
  };
}
