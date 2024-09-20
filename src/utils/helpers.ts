import * as Yup from "yup";
import { FormField } from "../types";

export const getValidationSchema = (fields: FormField[]) => {
  return Yup.object().shape(
    fields.reduce((acc, field, index) => {
      const fieldKey = `field${index}`;

      switch (field.type) {
        case "text":
        case "longtext": {
          const validationPattern = field.validation ? new RegExp(field.validation) : /.*$/;
          acc[fieldKey] = Yup.string()
            .matches(validationPattern, {
              message: `Field ${index + 1} must contain only letters (no spaces or special characters).`,
              excludeEmptyString: true,
            })
            .required(`Field ${index + 1} is required`);
          break;
        }

        case "number": {
          acc[fieldKey] = Yup.number()
            .min(field.min_value || 0, `Field ${index + 1} must be at least ${field.min_value}`)
            .max(field.max_value || 100, `Field ${index + 1} must be at most ${field.max_value}`)
            .required(`Field ${index + 1} is required`);
          break;
        }

        case "dropdown": {
          acc[fieldKey] = Yup.string().required(`Field ${index + 1} is required`);
          break;
        }

        default:
          break;
      }

      return acc;
    }, {} as Record<string, any>)
  );
};

export const initializeFormValues = (fields: FormField[]) => {
  return fields.reduce(
    (acc, field, index) => ({
      ...acc,
      [`field${index}`]: field.value !== undefined ? field.value : field.default_value || "",
    }),
    {} as Record<string, any>
  );
};
