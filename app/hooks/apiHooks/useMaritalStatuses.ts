import { useQuery } from "react-query";
import { Other_infoService } from "../../services/info/other_info.service";
import { IMaritalStatus } from "../../types/marital-status.type";

export default function useMaritalStatuses() {
  const { data, isLoading } = useQuery(
    "marital-statuses",
    () => Other_infoService.getMaritalStatuses(),
    {
      select: ({ data }) => {
        return data.map((item: IMaritalStatus) => ({
          label: item.text,
          value: item.id,
        }));
      },
    }
  );
  return {
    maritalStatusesList: data,
    isLoading,
  };
}
