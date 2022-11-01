import {FC, PropsWithChildren} from 'react'
import styles from './Dashboard.module.scss'
import Sidebar from "../../components/Statistics/Sidebar/Sidebar";

const DashboardLayout: FC<PropsWithChildren> = ({children}) => {
    return <div className={styles.wrapper}>
        <Sidebar/>
        <div className={styles.content}>{children}</div>
    </div>
}

export default DashboardLayout