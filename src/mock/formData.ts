import { FormField } from "../types";

export const FORM_DATA: FormField[] = [
  {
    default_value: "",
    validation: "^[a-zA-Z]+$",
    type: "text",
    value: "Text, only a-zA-Z",
  },
  {
    default_value: "Option 1",
    options: ["Option 1", "Option 2", "Option 3"],
    type: "dropdown",
  },
  {
    default_value: 50,
    min_value: 0,
    max_value: 100,
    type: "number",
  },
  {
    default_value: "",
    type: "longtext",
  },
  {
    default_value: "true",
    options: ["true", "false"],
    type: "dropdown",
  },
];
