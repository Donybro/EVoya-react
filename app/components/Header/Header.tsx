import { FC } from "react";

import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";
import styles from "./Header.module.scss";

const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ProfileDropDown />
    </div>
  );
};

export default Header;
