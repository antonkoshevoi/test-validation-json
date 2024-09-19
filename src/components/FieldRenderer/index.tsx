import { FormField } from "../../types";
import DropdownField from "../DropdownField";
import NumberField from "../NumberField";
import TextField from "../TextField";

export const FieldRenderer: React.FC<{ field: FormField; index: number }> = ({
  field,
  index,
}) => {
  const fieldKey = `field${index}`;

  switch (field.type) {
    case "text":
    case "longtext":
      return (
        <TextField
          key={index}
          fieldKey={fieldKey}
          index={index}
          type={field.type}
        />
      );

    case "number":
      return <NumberField key={index} fieldKey={fieldKey} index={index} />;

    case "dropdown":
      return (
        <DropdownField
          key={index}
          fieldKey={fieldKey}
          index={index}
          options={field.options || []}
        />
      );

    default:
      return null;
  }
};
