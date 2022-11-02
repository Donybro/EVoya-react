import { FC, PropsWithChildren } from "react";
import styles from "./AuthLayout.module.scss";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
