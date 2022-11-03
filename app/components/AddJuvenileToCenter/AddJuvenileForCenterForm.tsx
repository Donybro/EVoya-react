import { FC } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { fetchRegionsList } from "../../store/regions/regions.actions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useAction";

const AddJuvenileForCenterForm: FC = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      passportSeria: "",
      select: {},
    },
  });
  const onSubmit = (data: any) => console.log(data);
  const regionsList = useTypedSelector((state) => state.regions.regionsList);
  const { fetchRegionsList } = useAction();
  fetchRegionsList();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-[12px]"
    >
      <div className="">
        <label htmlFor="select">Hujjat turi</label>
        <Controller
          name="select"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              inputId="select"
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
            />
          )}
        />
      </div>
      <div className="">
        <label htmlFor="seria">Seria raqami</label>
        <input id="seria" {...register("passportSeria", { required: true })} />
      </div>
      <button className="border shadow px-4 py-2" type="submit">
        Send
      </button>
    </form>
  );
};

export default AddJuvenileForCenterForm;
