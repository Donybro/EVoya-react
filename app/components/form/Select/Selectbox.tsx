import { FC } from "react";
import { Controller } from "react-hook-form";
import styles from "./Selectbox.module.scss";
import Select from "react-select";

interface Props {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  control: any;
  error: string;
  options: any[];
}

const Selectbox: FC = ({
  id,
  name,
  control,
  label,
  error,
  options,
  placeholder,
}: Props) => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            instanceId={id}
            onChange={(newValue) => {
              field.onChange(newValue?.value);
            }}
            value={field?.label}
            placeholder={placeholder}
            classNamePrefix={"custom-select"}
            options={options}
          />
        )}
      />
      {error && <span className={"error_message"}>{error}</span>}
    </div>
  );
};

export default Selectbox;
