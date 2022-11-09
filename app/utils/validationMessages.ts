export const requiredValidatorMessage = ({ path }: any) => {
  return `Ushbu maydon to'ldirilishi shart`;
};
export const parentsAreRequiredValidationMessage = ({ path }: any) => {
  return `Ota ona yoki vasiyni kiritishingiz shart`;
};
export const workerIsRequiredValidatorMessage = () => {
  return "Xodimni belgilash zarur!";
};

export const minValidatorMessage = (args: any) => {
  return `Ushbu maydon eng kami ${args.min} ta bo\'lishi kerak`;
};
export const maxValidatorMessage = (args: any) => {
  return `Ushbu maydon eng ko\'pi ${args.max} ta bo\'lishi kerak`;
};
export const onlyLatinLetters = (args: any) => {
  return `Ushbu maydon faqat lotin harflari bilan to'ldirilishi kerak`;
};
