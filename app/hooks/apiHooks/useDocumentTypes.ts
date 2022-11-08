import { useQuery } from "react-query";
import { IDocumentType } from "../../types/document.type";
import { Other_infoService } from "../../services/info/other_info.service";

export default function useDocumentTypes() {
  const { data, isLoading } = useQuery(
    "document-types",
    () => Other_infoService.getDocumentTypes(),
    {
      select: ({ data }) => {
        return data.map((item: IDocumentType) => ({
          label: item.text,
          value: item.id,
        }));
      },
    }
  );
  return {
    documentTypes: data,
    isLoading,
  };
}
