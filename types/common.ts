export enum ACTION {
  ADD = "Add",
  EDIT = "Edit",
  DELETE = "Delete",
}

export enum GENDER {
  female = "Female",
  male = "Male",
  other = "Agender",
}

export const GENDER_SELECT = [
  {
    key: "gender-1",
    value: GENDER.female,
    label: "Female",
    id: "feild-female",
  },
  {
    key: "gender-2",
    value: GENDER.male,
    label: "Male",
    id: "feild-male",
  },
  {
    key: "gender-3",
    value: GENDER.other,
    label: "Other",
    id: "feild-other",
  },
];
