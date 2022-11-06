import { RadioGroup } from "@headlessui/react";
import { SetStateAction } from "react";

export interface IButtonGroupOptions {
  label: String;
  value: any;
}

export interface IButtonGroupProps {
  options: IButtonGroupOptions[];
  setValue: SetStateAction<IButtonGroupOptions>;
  selectedValue: any;
}

export default function ButtonGroup({
  options,
  setValue,
  selectedValue,
}: IButtonGroupProps) {
  return (
    <div className="w-full">
      <div className="w-full ">
        <RadioGroup value={selectedValue} onChange={setValue}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="flex gap-[12px]">
            {options.map((plan) => (
              <RadioGroup.Option
                key={plan.value}
                value={plan}
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
      </div>
    </div>
  );
}
