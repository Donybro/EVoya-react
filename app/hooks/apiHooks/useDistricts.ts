import { useQuery } from "react-query";
import { RegionsService } from "../../services/info/regions.service";
import { useState } from "react";
import { IDistrict } from "../../types/region-district.type";

export default function useDistricts() {
  const [districtsList, setDistrictsList] = useState<IDistrict[]>([]);
  const [regionId, setRegionId] = useState<string>("");
  const { isLoading } = useQuery(
    ["districts-list", regionId],
    () => RegionsService.getDistrictsListByRegionId(regionId),
    {
      onSuccess: ({ data }) => {
        setDistrictsList(data);
      },
      enabled: !!regionId,
    }
  );
  return {
    setDistrictsList,
    setRegionId,
    districtsList,
    isLoading,
  };
}
