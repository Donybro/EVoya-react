import { useMemo, useState } from "react";
import { ENUMDocumentType } from "../../types/DTO/document.type";

export default function usePersonalInfoFieldsValidation() {
  const [passportType, setPassportType] = useState();

  const otherDocTypesSelected = useMemo(
    () => passportType === ENUMDocumentType.OTHER_DOCS_TYPE,
    [passportType]
  );
  const foreignDocTypesSelected = useMemo(
    () => passportType === ENUMDocumentType.FOREIGN_TYPE,
    [passportType]
  );
  const selectedOtherOrForeignPassportType = useMemo(
    () =>
      passportType === ENUMDocumentType.FOREIGN_TYPE ||
      passportType === ENUMDocumentType.OTHER_DOCS_TYPE,
    [passportType]
  );

  return {
    otherDocTypesSelected,
    foreignDocTypesSelected,
    selectedOtherOrForeignPassportType,
    setPassportType,
  };
}
