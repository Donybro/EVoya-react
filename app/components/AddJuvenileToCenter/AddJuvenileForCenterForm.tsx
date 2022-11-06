import { FC, useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddJuvenileForCenterForm.module.scss";
import useRegions from "../../hooks/apiHooks/useRegions";
import { IRegion } from "../../types/region-district.type";
import useDocumentTypes from "../../hooks/apiHooks/useDocumentTypes";
import { IDocumentType } from "../../types/document.type";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useDistricts from "../../hooks/apiHooks/useDistricts";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import useSchoolTypes from "../../hooks/apiHooks/useSchoolTypes";
import { ISchoolType } from "../../types/school.type";

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
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      passport_type: "",
      passport_seria: "",
      birth_region: "",
      birth_district: "",
      last_name: "",
      first_name: "",
      father_name: "",
      pinfl: "",
      gender: btnGroupGenders[0],
      address_region: "",
      address_district: "",
      address: "",
      school_type: "",
      school_region: "",
      school_district: "",
      school_name: "",
    },
  });

  const onSubmit = (data: any) => console.log(data);
  const { regionsList, isLoading: regionsIsLoading } = useRegions();
  const { regionsList: addressRegionsList } = useRegions();
  const { regionsList: schoolRegionsList } = useRegions();
  const { documentTypes, isLoading: documentsIsLoading } = useDocumentTypes();
  const { schoolTypesList } = useSchoolTypes();
  const [juvenileGender, setJuvenileGender] = useState(null);

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
  const [startDate, setStartDate] = useState(new Date());

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={"text-3xl my-[12px]"}>Shaxsiy ma'lumotlar </h1>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="passport_type">Hujjat turi</label>
          <Controller
            name="passport_type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                inputId="select"
                placeholder="Hujjat turini tanlang"
                getOptionLabel={(option: IDocumentType) => option.text}
                getOptionValue={(option: IDocumentType) => option.id}
                classNamePrefix={"custom-select"}
                options={documentTypes}
              />
            )}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="passport_seria">Seria raqami</label>
          <input
            className="base_input"
            id="passport_seria"
            {...register("passport_seria", { required: true })}
          />
        </div>
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
          <DatePicker
            dateFormat="dd.MM.yyyy"
            placeholder={"Sanani tanlang"}
            className={"border border-[#ccc]"}
            id={"birth_date"}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
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
                // onChange={({ id }: IRegion) => {
                //   setBirthRegionId(id);
                // }}
                inputId="birth_region"
                placeholder={"Viloyatni tanlang"}
                getOptionLabel={(option: IRegion) => option.name}
                getOptionValue={(option: IRegion) => option.id}
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
                inputId="birth_district"
                placeholder={"Tumanni tanlang"}
                getOptionLabel={(option: IRegion) => option.name}
                getOptionValue={(option: IRegion) => option.id}
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
      </section>
      <h1 className={"text-3xl my-[12px]"}>Yashash manzil </h1>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="address_region"> Viloyat / Shahar </label>
          <Controller
            name="address_region"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                // onChange={({ id }: IRegion) => {
                //   setBirthRegionId(id);
                // }}
                inputId="birth_region"
                placeholder={"Viloyatni tanlang"}
                getOptionLabel={(option: IRegion) => option.name}
                getOptionValue={(option: IRegion) => option.id}
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
            render={({ field }) => (
              <Select
                {...field}
                inputId="address_district"
                placeholder={"Tumanni tanlang"}
                getOptionLabel={(option: IRegion) => option.name}
                getOptionValue={(option: IRegion) => option.id}
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
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="school_type"> Muassasa turi</label>
          <Controller
            name="school_type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                inputId="school_type"
                placeholder={"Ta`lim muassasini turini tanlang"}
                getOptionLabel={(option: ISchoolType) => option.text}
                getOptionValue={(option: ISchoolType) => option.id}
                classNamePrefix={"custom-select"}
                options={schoolTypesList}
              />
            )}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="school_region"> Viloyat / Shahar </label>
          <Controller
            name="school_region"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                inputId="school_region"
                placeholder={"Viloyatni tanlang"}
                getOptionLabel={(option: IRegion) => option.name}
                getOptionValue={(option: IRegion) => option.id}
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
                inputId="school_district"
                placeholder={"Tumanni tanlang"}
                getOptionLabel={(option: IRegion) => option.name}
                getOptionValue={(option: IRegion) => option.id}
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
      </section>

      {/*<button className="" type="submit">*/}
      {/*  Send*/}
      {/*</button>*/}
    </form>
  );
};

export default AddJuvenileForCenterForm;
