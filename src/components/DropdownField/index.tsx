import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./index.module.scss";

type DropdownFieldProps = {
  fieldKey: string;
  index: number;
  options: string[] | number[];
};

const DropdownField: React.FC<DropdownFieldProps> = React.memo((props) => {
  const { fieldKey, index, options } = props;

  return (
    <div className={styles.formGroup}>
      <label>Field {index + 1}</label>

      <ErrorMessage
        name={fieldKey}
        component="div"
        className={styles.errorMessage}
      />

      <Field name={fieldKey} as="select">
        <option value="">Select an option</option>

        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </Field>
    </div>
  );
});

export default DropdownField;
