import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './index.module.scss';

interface NumberFieldProps {
  fieldKey: string;
  index: number;
  value?: string | number | true;
}

const NumberField: React.FC<NumberFieldProps> = ({ fieldKey, index }) => (
  <div className={styles.formGroup}>
    <label>Field {index + 1}</label>
    <ErrorMessage name={fieldKey} component="div" className={styles.errorMessage} />
    <Field name={fieldKey}>
      {({ field }: { field: any }) => <input {...field} type="number" />}
    </Field>
  </div>
);

export default NumberField;