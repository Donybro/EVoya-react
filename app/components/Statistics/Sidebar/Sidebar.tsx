import {FC} from 'react'
import styles from './Sidebar.module.scss'
import Image from 'next/image'


const Sidebar: FC = () => {
    return <div className={styles.sidebar}>
        <div className={styles.titleWrapper}>
            <Image src="/icons/IIBLogo.png" className={styles.logo} alt="me" width="64" height="64" />
            <p className={styles.title}>O'zbekiston Resbublikasi Ichki Ishlar Vazirligi</p>
        </div>
    </div>
}

export default Sidebar