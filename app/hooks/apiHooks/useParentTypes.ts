import { useQuery } from "react-query";
import { useState } from "react";
import { Other_infoService } from "../../services/info/other_info.service";
import { IParentType } from "../../types/parent.type";

export default function useParentTypes() {
  const [parentTypes, setParentTypes] = useState<IParentType[]>([]);
  const { isLoading } = useQuery(
    "parent-types",
    () => Other_infoService.getParentTypes(),
    {
      onSuccess: ({ data }) => {
        setParentTypes(data);
      },
    }
  );
  return {
    parentTypes,
    isLoading,
  };
}
