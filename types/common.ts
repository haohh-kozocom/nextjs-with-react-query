export enum ACTION {
  ADD = "add",
  EDIT = "edit",
}

export enum GENDER {
  famale = "famale",
  male = "male",
}

export const GENDER_SELECT = [
  {
    key: "gender-1",
    value: GENDER.famale,
    label: "Famale",
    id: "feild-famale",
  },
  {
    key: "gender-2",
    value: GENDER.male,
    label: "Male",
    id: "feild-male",
  },
];
