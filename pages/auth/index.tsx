import { FC } from "react";
import AuthView from "../../app/components/Auth/AuthView";
import AuthLayout from "../../app/layouts/AuthLayout/AuthLayout";

const Index: FC = () => {
  return (
    <AuthLayout>
      <AuthView />
    </AuthLayout>
  );
};

export default Index;
