import { useQuery } from "react-query";
import { Other_infoService } from "../../services/info/other_info.service";
import { ICountry } from "../../types/DTO/country.type";

export default function useCountriesList() {
  const { data, isLoading } = useQuery(
    "countries-list",
    () => Other_infoService.getCountriesList(),
    {
      select: ({ data }) => {
        return data?.countries.map((item: ICountry) => ({
          label: item.name,
          value: item.id,
        }));
      },
    }
  );
  return {
    countriesList: data || [],
    isLoading,
  };
}
