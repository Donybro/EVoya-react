import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useParentTypes from "../../../hooks/apiHooks/useParentTypes";
import styles from "../AddJuvenileForCenterForm.module.scss";
import Select from "react-select";
import { IParent } from "../../../types/parent.type";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const defaultFormValues = {
  last_name: "",
  first_name: "",
  father_name: "",
  birth_date: undefined,
  pinfl: "",
  employment: "",
  parent_type: undefined,
};
interface IAddParentsProps {}
const AddParents: FC<IAddParentsProps> = ({}: IAddParentsProps) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    reset,
    resetField,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const { parentTypesList } = useParentTypes();
  const onSubmit = (data: IParent) => {
    reset();
    setParentsList([...parentsList, data]);
  };

  const [parentsList, setParentsList] = useState<IParent[]>([]);
  const [filteredParentTypes, setFilteredParentTypes] = useState<IParent[]>([]);

  useEffect(() => {
    setFilteredParentTypes(parentTypesList);
  }, [parentTypesList]);

  useEffect(() => {
    if (filteredParentTypes.length) {
      const usedParentTypes = [...parentsList.map((p) => p.parent_type.value)];
      delete usedParentTypes[usedParentTypes.indexOf(3)];
      const filtered = parentTypesList.filter(
        (type: any) => !usedParentTypes.includes(type.value)
      );
      setFilteredParentTypes(filtered);
    } else {
      setFilteredParentTypes([]);
    }
  }, [parentsList]);

  return (
    <div>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-[12px] mb-[38px]">
        <div className={styles.fieldWrapper}>
          <label htmlFor="parent_type"> Boquvchining turi</label>
          <Controller
            name={"parent_type"}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="parent_type"
                placeholder={"Boquvchining turini tanlang"}
                classNamePrefix={"custom-select"}
                options={filteredParentTypes}
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
          <label htmlFor="employment">Qisqacha ma`lumot </label>
          <textarea
            placeholder={"Sharifini kiriting"}
            className="base_input"
            id="employment"
            {...register("employment", { required: true })}
          />
        </div>
      </section>
      <button className={"base_input"} onClick={handleSubmit(onSubmit)}>
        Qo'shish
      </button>
      <section>
        {parentsList.map((parent: IParent) => (
          <div
            key={parent.pinfl}
            className={"bg-gray-100 shadow px-[12px] py-[6px] rounded"}
          >
            <div>
              Full Name:
              {`${parent.first_name} ${parent.last_name} ${parent.father_name}`}
            </div>
            <div>Type: {parent.parent_type.label}</div>
            <div>pinfl: {parent.pinfl}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AddParents;
