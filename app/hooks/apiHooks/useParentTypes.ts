import { useQuery } from "react-query";
import { Other_infoService } from "../../services/info/other_info.service";
import { IParentType } from "../../types/parent.type";

export default function useParentTypes() {
  const { isLoading, data } = useQuery(
    "parent-types",
    () => Other_infoService.getParentTypes(),
    {
      select: ({ data }) => {
        const parentList = data.map((item: IParentType) => ({
          label: item.text,
          value: item.id,
        }));
        return parentList;
      },
    }
  );

  return {
    data,
    isLoading,
  };
}
