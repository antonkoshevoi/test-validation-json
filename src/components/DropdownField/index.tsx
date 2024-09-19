import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './index.module.scss';

interface DropdownFieldProps {
  fieldKey: string;
  index: number;
  options: string[] | number[];
  value?: string | number | true;
}

const DropdownField: React.FC<DropdownFieldProps> = ({ fieldKey, index, options }) => (
  <div className={styles.formGroup}>
    <label>Field {index + 1}</label>
    <ErrorMessage name={fieldKey} component="div" className={styles.errorMessage} />
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

export default DropdownField;