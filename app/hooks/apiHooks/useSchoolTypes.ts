import { useQuery } from "react-query";
import { Other_infoService } from "../../services/info/other_info.service";
import { ISchoolType } from "../../types/DTO/school.type";

export default function useSchoolTypes() {
  const { data, isLoading } = useQuery(
    "school-Types",
    () => Other_infoService.getSchoolTypes(),
    {
      select: ({ data }) => {
        return data.map((item: ISchoolType) => ({
          label: item.text,
          value: item.id,
        }));
      },
    }
  );
  return {
    schoolTypesList: data,
    isLoading,
  };
}
