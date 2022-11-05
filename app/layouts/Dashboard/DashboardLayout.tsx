import { FC, PropsWithChildren } from "react";
import styles from "./Dashboard.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="pt-[25px] px-[25px] h-full">
          <div className={styles.content}>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
