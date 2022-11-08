import { FC } from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";

import sidebarLinks from "../../utils/sidebarLinks";
import Link from "next/link";

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.titleWrapper}>
        <Image
          src="/icons/IIBLogo.png"
          className={styles.logo}
          alt="me"
          width="64"
          height="64"
        />
        <p className={styles.title}>
          O'zbekiston Resbublikasi Ichki Ishlar Vazirligi
        </p>
      </div>
      <ul className={styles.linksWrapper}>
        {sidebarLinks.Navbatchi.map((item) => (
          <Link href={item.path} key={item.path}>
            <li className={styles.link}>{item.label}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
