import { useQuery } from "react-query";
import { useState } from "react";
import { Other_infoService } from "../../services/info/other_info.service";
import { ISchoolType } from "../../types/school.type";

export default function useSchoolTypes() {
  const [schoolTypes, setSchoolTypes] = useState<ISchoolType[]>([]);
  const { isLoading } = useQuery(
    "school-Types",
    () => Other_infoService.getSchoolTypes(),
    {
      onSuccess: ({ data }) => {
        setSchoolTypes(data);
      },
    }
  );
  return {
    schoolTypes,
    isLoading,
  };
}
