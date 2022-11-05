import { FC, useState } from "react";
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

const AddJuvenileForCenterForm: FC = () => {
  const {
    control,
    handleSubmit,
    register,
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
    },
  });

  const onSubmit = (data: any) => console.log(data);
  const { regionsList, isLoading: regionsIsLoading } = useRegions();
  const { documentTypes, isLoading: documentsIsLoading } = useDocumentTypes();
  const {
    districtsList: birthDistrictList,
    isLoading: districtsListIsLoading,
    setRegionId: setBirthRegionId,
  } = useDistricts();
  const [startDate, setStartDate] = useState(new Date());
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-[12px]"
    >
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
        <label htmlFor="birth_region"> Tug'ilgan Tumani </label>
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
      {/*<button className="" type="submit">*/}
      {/*  Send*/}
      {/*</button>*/}
    </form>
  );
};

export default AddJuvenileForCenterForm;
