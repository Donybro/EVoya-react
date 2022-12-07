import { useQuery } from "react-query";
import { Other_infoService } from "../../services/info/other_info.service";
import { IParentType } from "../../types/DTO/parent.type";

export default function useParentTypes() {
  const { isLoading, data } = useQuery(
    "parent-types",
    () => Other_infoService.getParentTypes(),
    {
      select: ({ data }) => {
        return data.map((item: IParentType) => ({
          label: item.text,
          value: item.id,
        }));
      },
    }
  );

  return {
    parentTypesList: data,
    isLoading,
  };
}
