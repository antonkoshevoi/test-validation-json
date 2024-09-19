import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './index.module.scss';

interface NumberFieldProps {
  fieldKey: string;
  index: number;
}

const NumberField: React.FC<NumberFieldProps> = ({ fieldKey, index }) => (
  <div className={styles.formGroup}>
    <label>Field {index + 1}</label>
    <ErrorMessage name={fieldKey} component="div" className={styles.errorMessage} />
    <Field name={fieldKey} type="number" />
  </div>
);

export default NumberField;