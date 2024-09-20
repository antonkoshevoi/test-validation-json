import { FormField } from "../../types";
import DropdownField from "../DropdownField";
import NumberField from "../NumberField";
import TextField from "../TextField";
import React from "react";

export const FieldRenderer: React.FC<{ field: FormField; index: number }> = React.memo(
  ({ field, index }) => {
    const fieldKey = `field${index}`;

    switch (field.type) {
      case "text":
      case "longtext":
        return (
          <TextField
            fieldKey={fieldKey}
            index={index}
            type={field.type}
          />
        );

      case "number":
        return <NumberField fieldKey={fieldKey} index={index} />;

      case "dropdown":
        return (
          <DropdownField
            fieldKey={fieldKey}
            index={index}
            options={field.options || []}
          />
        );

      default:
        return null;
    }
  }
);