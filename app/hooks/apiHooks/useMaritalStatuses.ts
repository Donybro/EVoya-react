import { useQuery } from "react-query";
import { useState } from "react";
import { Other_infoService } from "../../services/info/other_info.service";
import { IMaritalStatus } from "../../types/marital-status.type";

export default function useMaritalStatuses() {
  const [maritalStatuses, setMaritalStatuses] = useState<IMaritalStatus[]>([]);
  const { isLoading } = useQuery(
    "marital-statuses",
    () => Other_infoService.getMaritalStatuses(),
    {
      onSuccess: ({ data }) => {
        setMaritalStatuses(data);
      },
    }
  );
  return {
    maritalStatuses,
    isLoading,
  };
}
