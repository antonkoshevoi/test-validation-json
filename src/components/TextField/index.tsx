import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './index.module.scss';

interface TextFieldProps {
  fieldKey: string;
  index: number;
  type: 'text' | 'longtext';
}

const TextField: React.FC<TextFieldProps> = ({ fieldKey, index, type }) => (
  <div className={styles.formGroup}>
    <label>Field {index + 1}</label>
    <ErrorMessage name={fieldKey} component="div" className={styles.errorMessage} />
    <Field name={fieldKey} as={type === 'longtext' ? 'textarea' : 'input'} />
  </div>
);

export default TextField;