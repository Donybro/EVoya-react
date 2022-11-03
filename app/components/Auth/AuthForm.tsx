import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./Auth.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAuth } from "./auth.interface";
import classNames from "classnames";
import { useAction } from "../../hooks/useAction";

const AuthForm: FC = () => {
  const schema = yup
    .object({
      login: yup.string().required("is required"),
      password: yup.string().required("is required").min(6, "error min"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { auth } = useAction();
  const onSubmit = async (data: IAuth) => {
    await auth(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[12px]">
        <input
          placeholder="Login"
          className={styles.login}
          id="login"
          {...register("login")}
        />
        <div>{errors?.login && <div>{errors.login.message}</div>}</div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <input
          placeholder="Parol"
          className={styles.login}
          type="password"
          id="password"
          {...register("password")}
        />
        <div>{errors?.password && <div>{errors.password.message}</div>}</div>
      </div>

      <button className={classNames(styles.button)} type="submit">
        Kirish
      </button>
    </form>
  );
};
export default AuthForm;
