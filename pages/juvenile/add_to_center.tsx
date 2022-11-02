import { FC } from "react";
import AddJuvenileToCenter from "../../app/components/AddJuvenileToCenter/AddJuvenileToCenter";
import DashboardLayout from "../../app/layouts/Dashboard/DashboardLayout";

const AddToCenter: FC = () => {
  return (
    <DashboardLayout>
      <AddJuvenileToCenter />
    </DashboardLayout>
  );
};

export default AddToCenter;
