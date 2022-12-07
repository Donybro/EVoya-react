import {FC} from 'react'
import CreatePersonalInfo from "../../app/components/CreateJuvenile/Defined/CreatePersonalInfo/CreatePersonalInfo";
import DashboardLayout from "../../app/layouts/Dashboard/DashboardLayout";

const Create: FC = () => {
    return <DashboardLayout>
    <CreatePersonalInfo/>
    </DashboardLayout>
}

export default Create