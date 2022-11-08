import { FC, useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddJuvenileForCenterForm.module.scss";
import useRegions from "../../hooks/apiHooks/useRegions";
import useDocumentTypes from "../../hooks/apiHooks/useDocumentTypes";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useDistricts from "../../hooks/apiHooks/useDistricts";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import useSchoolTypes from "../../hooks/apiHooks/useSchoolTypes";
import { useDropzone } from "react-dropzone";
import useMaritalStatuses from "../../hooks/apiHooks/useMaritalStatuses";
import AddParents from "./AddParents/AddParents";
import useAddJuvenileToCenterFormValidation from "../../hooks/validations/useAddJuvenileToCenterForm.validation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const AddJuvenileForCenterForm: FC = () => {
  const schema = yup
    .object({
      firstName: yup.string().required(),
      age: yup.number().positive().integer().required(),
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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      passport_type: undefined,
      passport_seria: "",
      birth_region: "",
      birth_district: "",
      last_name: "",
      first_name: "",
      father_name: "",
      birth_date: undefined,
      pinfl: "",
      gender: btnGroupGenders[0],
      address_region: "",
      address_district: "",
      address: "",
      school_type: undefined,
      school_region: "",
      school_district: "",
      school_name: "",
      marital_status: undefined,
      parent_type: "",
      reference_type: undefined,
      photo: undefined,
    },
  });

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

  const onSubmit = (data: any) => console.log(data);
  const { regionsList, isLoading: regionsIsLoading } = useRegions();
  const { regionsList: addressRegionsList } = useRegions();
  const { regionsList: schoolRegionsList } = useRegions();
  const { documentTypes, isLoading: documentsIsLoading } = useDocumentTypes();
  const { schoolTypesList } = useSchoolTypes();
  const { maritalStatusesList } = useMaritalStatuses();
  const [juvenileGender, setJuvenileGender] = useState(null);
  const {
    setPassportType,
    otherDocTypesSelected,
    setSchoolType,
    workingOrNotWorkingNotStudyingTypeSelected,
    maritalStatus,
    setMaritalStatus,
    hasNotAnybody,
  } = useAddJuvenileToCenterFormValidation();
  const {
    districtsList: birthDistrictList,
    isLoading: districtsListIsLoading,
    setRegionId: setBirthRegionId,
  } = useDistricts();
  const {
    districtsList: schoolDistrictList,
    isLoading: schoolListIsLoading,
    setRegionId: setSchoolRegionId,
  } = useDistricts();
  const {
    districtsList: addressDistrictList,
    isLoading: addressListIsLoading,
    setRegionId: setAddressRegionId,
  } = useDistricts();
  // const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const birth_region = getValues("birth_region");
    setValue("birth_district", "");
    setBirthRegionId(birth_region.id);
  }, [watch("birth_region")]);

  useEffect(() => {
    const address_region = getValues("address_region");
    setValue("address_district", "");
    setAddressRegionId(address_region.id);
  }, [watch("address_region")]);

  useEffect(() => {
    const school_region = getValues("school_region");
    setValue("school_district", "");
    setSchoolRegionId(school_region.id);
  }, [watch("school_region")]);

  useEffect(() => {
    const passport_type = getValues("passport_type");
    setPassportType(passport_type);
  }, [watch("passport_type")]);

  useEffect(() => {
    const school_type = getValues("school_type");
    setSchoolType(school_type);
  }, [watch("school_type")]);

  useEffect(() => {
    const marital_status = getValues("marital_status");
    setMaritalStatus(marital_status);
  }, [watch("marital_status")]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={"text-3xl my-[12px]"}>Shaxsiy ma'lumotlar </h1>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px] mb-[38px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="passport_type">Hujjat turi</label>
          <Controller
            name="passport_type"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="select"
                placeholder="Hujjat turini tanlang"
                classNamePrefix={"custom-select"}
                options={documentTypes}
              />
            )}
          />
        </div>
        {!otherDocTypesSelected && (
          <div className={styles.fieldWrapper}>
            <label htmlFor="passport_seria">Seria raqami</label>
            <input
              placeholder={"Seriya raqamini kiriting"}
              className="base_input"
              id="passport_seria"
              {...register("passport_seria", { required: true })}
            />
          </div>
        )}
        {otherDocTypesSelected && (
          <div className={styles.fieldWrapper}>
            <label htmlFor="reference_type">Ma'lumotnoma </label>
            <Controller
              name={"reference_type"}
              control={control}
              rules={{
                required: true,
              }}
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
          </div>
        )}
        <div className={styles.fieldWrapper}>
          <label htmlFor="last_name">Familiya</label>
          <input
            placeholder={"Familiyasini kiriting"}
            className="base_input"
            id="passport_seria"
            {...register("last_name", { required: true })}
          />
        </div>

        <div className={styles.fieldWrapper}>
          <label htmlFor="first_name">Ismi</label>
          <input
            placeholder={"Ismini kiriting"}
            className="base_input"
            id="first_name"
            {...register("first_name", { required: true })}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="father_name"> Sharifi</label>
          <input
            placeholder={"Sharifini kiriting"}
            className="base_input"
            id="father_name"
            {...register("father_name", { required: true })}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="birth_date"> Tug‘ilgan sanasi </label>
          <Controller
            name={"birth_date"}
            control={control}
            rules={{
              required: true,
            }}
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
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="birth_region"> Tug'ilgan Viloyat / Shahar </label>
          <Controller
            name="birth_region"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="birth_region"
                placeholder={"Viloyatni tanlang"}
                classNamePrefix={"custom-select"}
                options={regionsList}
              />
            )}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="birth_district"> Tug'ilgan Tumani </label>
          <Controller
            name="birth_district"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="birth_district"
                placeholder={"Tumanni tanlang"}
                classNamePrefix={"custom-select"}
                options={birthDistrictList}
              />
            )}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="pinfl">JSHSHIR</label>
          <input
            placeholder={"JSHSHIR ni kiriting"}
            className="base_input"
            id="pinfl"
            {...register("pinfl", { required: true, max: 14, min: 14 })}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="gender"> Jinsi </label>
          <ButtonGroup
            options={btnGroupGenders}
            setValue={setJuvenileGender}
            selectedValue={juvenileGender}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="photo">Rasm</label>
          <Controller
            name={"photo"}
            control={control}
            rules={{
              required: true,
            }}
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
        </div>
      </section>
      <h1 className={"text-3xl my-[12px]"}>Yashash manzil </h1>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px] mb-[38px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="address_region"> Viloyat / Shahar </label>
          <Controller
            name="address_region"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="birth_region"
                placeholder={"Viloyatni tanlang"}
                classNamePrefix={"custom-select"}
                options={addressRegionsList}
              />
            )}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="address_district"> Tumani </label>
          <Controller
            name="address_district"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="address_district"
                placeholder={"Tumanni tanlang"}
                classNamePrefix={"custom-select"}
                options={addressDistrictList}
              />
            )}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="address"> Ko'cha,uy </label>
          <input
            placeholder={"Ko'cha , uyni kiriting"}
            className="base_input"
            id="address"
            {...register("address", { required: true })}
          />
        </div>
      </section>
      <h1 className={"text-3xl my-[12px]"}> Ta`lim</h1>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px] mb-[38px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="school_type"> Muassasa turi</label>
          <Controller
            name="school_type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="school_type"
                placeholder={"Ta`lim muassasini turini tanlang"}
                classNamePrefix={"custom-select"}
                options={schoolTypesList}
              />
            )}
          />
        </div>
        {!workingOrNotWorkingNotStudyingTypeSelected && (
          <>
            <div className={styles.fieldWrapper}>
              <label htmlFor="school_region"> Viloyat / Shahar </label>
              <Controller
                name="school_region"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    instanceId="school_region"
                    placeholder={"Viloyatni tanlang"}
                    classNamePrefix={"custom-select"}
                    options={schoolRegionsList}
                  />
                )}
              />
            </div>
            <div className={styles.fieldWrapper}>
              <label htmlFor="school_district"> Tumani </label>
              <Controller
                name="school_district"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    instanceId="school_district"
                    placeholder={"Tumanni tanlang"}
                    classNamePrefix={"custom-select"}
                    options={schoolDistrictList}
                  />
                )}
              />
            </div>
            <div className={styles.fieldWrapper}>
              <label htmlFor="school_name">Muassasa nomi (raqami)</label>
              <input
                className="base_input"
                placeholder={"Ta`lim muassasini kiriting"}
                id="school_name"
                {...register("school_name", { required: true })}
              />
            </div>
          </>
        )}
      </section>
      <h1 className={"text-3xl my-[12px]"}>
        Bolaning boquvchisi haqida ma'lumotlar
      </h1>
      <section className="mb-[38px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="marital_status"> Bolaning holati </label>
          <Controller
            name={"marital_status"}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="marital_status"
                placeholder={"Holatini tanlang"}
                classNamePrefix={"custom-select"}
                options={maritalStatusesList}
              />
            )}
          />
        </div>
        {!hasNotAnybody && <AddParents maritalStatus={maritalStatus} />}
      </section>
      <button className="" type="submit">
        Send
      </button>
    </form>
  );
};

export default AddJuvenileForCenterForm;
