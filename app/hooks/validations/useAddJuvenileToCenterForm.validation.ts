import { useEffect, useState } from "react";
import { ENUMDocumentType } from "../../types/document.type";
import { ENUMSchoolType } from "../../types/school.type";
import { ENUMMaritalStatusType } from "../../types/marital-status.type";

export default function useAddJuvenileToCenterFormValidation() {
  const [passportType, setPassportType] = useState();
  const [otherDocTypesSelected, setOtherDocTypesSelected] = useState(false);
  useEffect(() => {
    if (passportType?.value === ENUMDocumentType.OTHER_DOCS_TYPE) {
      setOtherDocTypesSelected(true);
    } else {
      setOtherDocTypesSelected(false);
    }
  }, [passportType]);

  const [schoolType, setSchoolType] = useState();
  const [
    workingOrNotWorkingNotStudyingTypeSelected,
    setWorkingOrNotWorkingNotStudyingTypeSelected,
  ] = useState(false);
  useEffect(() => {
    if (
      schoolType?.value === ENUMSchoolType.IS_WORKING_TYPE ||
      schoolType?.value === ENUMSchoolType.NO_WORKING_NO_STUDYING_TYPE
    ) {
      setWorkingOrNotWorkingNotStudyingTypeSelected(true);
    } else {
      setWorkingOrNotWorkingNotStudyingTypeSelected(false);
    }
  }, [schoolType]);

  const [maritalStatus, setMaritalStatus] = useState();
  const [hasNotAnybody, setHasNotAnybody] = useState(false);

  useEffect(() => {
    if (maritalStatus?.value === ENUMMaritalStatusType.HAS_NOT_ANYBODY_TYPE) {
      setHasNotAnybody(true);
    } else {
      setHasNotAnybody(false);
    }
  }, [maritalStatus]);

  return {
    otherDocTypesSelected,
    workingOrNotWorkingNotStudyingTypeSelected,
    setPassportType,
    setSchoolType,
    maritalStatus,
    setMaritalStatus,
    hasNotAnybody,
  };
}
