import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./InputText.module.scss";

interface Props {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error: string;
}

const InputText: FC = ({
  id,
  name,
  label,
  register,
  error,
  placeholder,
}: Props) => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        placeholder={placeholder}
        id={id}
        {...register(name)}
      />
      {error && <span className={"error_message"}>{error}</span>}
    </div>
  );
};

export default InputText;
