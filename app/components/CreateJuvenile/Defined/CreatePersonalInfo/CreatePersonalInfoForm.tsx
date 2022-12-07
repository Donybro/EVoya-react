import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { date, mixed, number, string } from "yup";
import { requiredValidatorMessage } from "../../../../utils/validationMessages";
import styles from "../../../AddJuvenileToCenter/AddJuvenileForCenterForm.module.scss";
import DatePicker from "react-datepicker";
import ButtonGroup from "../../../common/ButtonGroup/ButtonGroup";
import useDocumentTypes from "../../../../hooks/apiHooks/useDocumentTypes";
import useRegions from "../../../../hooks/apiHooks/useRegions";
import { useDropzone } from "react-dropzone";
import useDistricts from "../../../../hooks/apiHooks/useDistricts";
import "react-datepicker/dist/react-datepicker.css";
import usePersonalInfoFieldsValidation from "../../../../hooks/validations/usePersonalInfoFieldsValidation";
import useCountriesList from "../../../../hooks/apiHooks/useCountriesList";
import { File } from "@babel/types";
import InputText from "../../../form/InputText/InputText";
import Selectbox from "../../../form/Select/Selectbox";

export interface PersonalInfo {
  passport_type: number;
  passport_seria: string;
  birth_region: string;
  birth_district: string;
  foreign_country: string;
  last_name: string;
  first_name: string;
  father_name: string;
  birth_date: string;
  pinfl: string;
  gender: string;
  reference_type: File;
  photo: File;
}

const CreatePersonalInfoForm: FC = () => {
  const {
    setPassportType,
    otherDocTypesSelected,
    foreignDocTypesSelected,
    selectedOtherOrForeignPassportType,
  } = usePersonalInfoFieldsValidation();

  const schema = yup
    .object({
      passport_type: number().required(requiredValidatorMessage),
      passport_seria: otherDocTypesSelected
        ? string()
        : string().required(requiredValidatorMessage),
      birth_region: string().required(requiredValidatorMessage),
      birth_district: string().required(requiredValidatorMessage),
      foreign_country: string().required(requiredValidatorMessage),
      last_name: string().required(requiredValidatorMessage),
      first_name: string().required(requiredValidatorMessage),
      father_name: string().required(requiredValidatorMessage),
      birth_date: date().required(requiredValidatorMessage),
      pinfl: string().required(requiredValidatorMessage),
      gender: string().required(requiredValidatorMessage),
      reference_type: otherDocTypesSelected
        ? mixed().required(requiredValidatorMessage)
        : mixed(),
      photo: mixed().required(requiredValidatorMessage),
    })
    .required();

  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  console.log(errors, "errors");

  const { documentTypes, isLoading: documentsIsLoading } = useDocumentTypes();
  const { regionsList, isLoading: regionsIsLoading } = useRegions();
  const { countriesList, isLoading: countriesIsLoading } = useCountriesList();
  const {
    districtsList: birthDistrictList,
    isLoading: districtsListIsLoading,
    setRegionId: setBirthRegionId,
  } = useDistricts();

  const {
    acceptedFiles: acceptedReferenceFiles,
    getRootProps: getRootPropsReference,
    getInputProps: getInputPropsReference,
  } = useDropzone();
  const {
    acceptedFiles: acceptedPhotoFiles,
    getRootProps: getRootPropsPhoto,
    getInputProps: getInputPropsPhoto,
  } = useDropzone();

  const filesReference = acceptedReferenceFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const filesPhoto = acceptedPhotoFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const btnGroupGenders = [
    {
      label: "Erkak",
      value: "M",
    },
    {
      label: "Ayol",
      value: "F",
    },
  ];

  useEffect(() => {
    const passport_type = getValues("passport_type");
    setPassportType(passport_type);
  }, [watch("passport_type")]);

  useEffect(() => {
    const birth_region = getValues("birth_region");
    setValue("birth_district", "");
    setBirthRegionId(birth_region);
  }, [watch("birth_region")]);

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px] mb-[38px]">
        <Selectbox
          id="passport_type"
          name="passport_type"
          control={control}
          label="Hujjat turi"
          placeholder="Hujjat turini tanlang"
          options={documentTypes}
          error={errors?.passport_type?.message || ""}
        />
        {!selectedOtherOrForeignPassportType && (
          <InputText
            placeholder={"Seriya raqamini kiriting"}
            label={"Seria raqami"}
            name="passport_seria"
            id="passport_seria"
            error={errors?.passport_seria?.message || ""}
            register={register}
          />
        )}
        {otherDocTypesSelected && (
          <div className={styles.fieldWrapper}>
            <label htmlFor="reference_type">Ma'lumotnoma </label>
            <Controller
              name={"reference_type"}
              control={control}
              render={({ field }) => (
                <section className="shadow flex flex-col gap-[12px]">
                  <div
                    {...field}
                    {...getRootPropsReference({ className: "dropzone" })}
                  >
                    <input
                      id={"reference_type"}
                      {...getInputPropsReference()}
                    />
                    <p className={"base_input cursor-pointer"}>
                      Ma'lumotnomani yuklang
                    </p>
                  </div>
                  <aside className={"px-[8px] py-[4px]"}>
                    <ul>{filesReference}</ul>
                  </aside>
                </section>
              )}
            />
            {errors.reference_type && (
              <span className={"error_message"}>
                {errors.reference_type.message}
              </span>
            )}
          </div>
        )}
        {foreignDocTypesSelected && (
          <Selectbox
            id="foreign_country"
            name="foreign_country"
            control={control}
            label="Horijiy davlat"
            placeholder="Davlatni tanlang"
            options={countriesList}
            error={errors?.foreign_country?.message || ""}
          />
        )}
        {!selectedOtherOrForeignPassportType && (
          <InputText
            placeholder="JSHSHIR ni kiriting"
            label="JSHSHIR"
            name="pinfl"
            id="pinfl"
            error={errors?.pinfl?.message || ""}
            register={register}
          />
        )}
      </section>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px] mb-[38px]">
        <InputText
          placeholder="Familiyasini kiriting"
          label="Familiya"
          name="last_name"
          id="last_name"
          error={errors?.last_name?.message || ""}
          register={register}
        />
        <InputText
          placeholder="Ismini kiriting"
          label="Ismi"
          name="first_name"
          id="first_name"
          error={errors?.first_name?.message || ""}
          register={register}
        />
        <InputText
          placeholder="Sharifini kiriting"
          label="Sharifi"
          name="father_name"
          id="father_name"
          error={errors?.father_name?.message || ""}
          register={register}
        />
        <div className={styles.fieldWrapper}>
          <label htmlFor="birth_date"> Tug‘ilgan sanasi </label>
          <Controller
            name={"birth_date"}
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                dateFormat="dd.MM.yyyy"
                placeholderText={"Sanani tanlang"}
                className={"border border-[#ccc]"}
                id={"birth_date"}
                selected={getValues("birth_date")}
              />
            )}
          />
          {errors.birth_date && (
            <span className={"error_message"}>{errors.birth_date.message}</span>
          )}
        </div>
        <Selectbox
          id="birth_region"
          name="birth_region"
          control={control}
          label="Tug'ilgan Viloyat / Shahar"
          placeholder="Viloyatni tanlang"
          options={regionsList}
          error={errors?.birth_region?.message || ""}
        />
        <Selectbox
          id="birth_district"
          name="birth_district"
          control={control}
          label="Tug'ilgan Tumani"
          placeholder="Tumanni tanlang"
          options={birthDistrictList}
          error={errors?.birth_district?.message || ""}
        />
        <div className={styles.fieldWrapper}>
          <label htmlFor="gender"> Jinsi </label>
          <ButtonGroup
            control={control}
            name={"gender"}
            options={btnGroupGenders}
          />
          {errors.gender && (
            <span className={"error_message"}>{errors.gender.message}</span>
          )}
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="photo">Rasm</label>
          <Controller
            name={"photo"}
            control={control}
            render={({ field }) => (
              <section className="shadow flex flex-col gap-[12px]">
                <div
                  {...field}
                  {...getRootPropsPhoto({ className: "dropzone" })}
                >
                  <input id={"photo"} {...getInputPropsPhoto()} />
                  <p className={"base_input cursor-pointer"}>Rasm yuklang</p>
                </div>
                <aside className={"px-[8px] py-[4px]"}>
                  <ul>{filesPhoto}</ul>
                </aside>
              </section>
            )}
          />
          {errors.photo && (
            <span className={"error_message"}>{errors.photo.message}</span>
          )}
        </div>
      </section>
      <button
        className="bg-amber-500 px-[12px] py-[6px] text-white"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default CreatePersonalInfoForm;
