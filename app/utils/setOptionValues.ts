interface IOptionsList {
  options: [];
  labelName: string;
  valueName: string;
}

export const getSelectOption = (options: IOptionsList) => {
  return options.options.map((item) => {
    return {
      label: item[options.labelName],
      value: item[options.valueName],
    };
  });
};
