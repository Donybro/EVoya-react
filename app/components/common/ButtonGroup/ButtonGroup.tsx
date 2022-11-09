import { RadioGroup } from "@headlessui/react";
import { useController, UseControllerProps } from "react-hook-form";

export interface IButtonGroupOptions {
  label: string;
  value: any;
}
type Props = {
  options: IButtonGroupOptions[];
};

export default function ButtonGroup(props: UseControllerProps & Props) {
  const {
    field: { value, onChange },
  } = useController(props);
  const { options } = props;

  return (
    <>
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="flex gap-[12px]">
          {options.map((plan) => (
            <RadioGroup.Option
              key={plan.value}
              value={plan.value}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 w-full ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                    : "w-full"
                }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-center">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {plan.label}
                        </RadioGroup.Label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}
