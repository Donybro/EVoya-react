import { useQuery } from "react-query";
import { useState } from "react";
import { IDocumentType } from "../../types/document.type";
import { Other_infoService } from "../../services/info/other_info.service";

export default function useDocumentTypes() {
  const [documentTypes, setDocumentTypes] = useState<IDocumentType[]>([]);
  const { isLoading } = useQuery(
    "document-types",
    () => Other_infoService.getDocumentTypes(),
    {
      onSuccess: ({ data }) => {
        setDocumentTypes(data);
      },
    }
  );
  return {
    documentTypes,
    isLoading,
  };
}
