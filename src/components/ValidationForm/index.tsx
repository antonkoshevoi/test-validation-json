import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import styles from './index.module.scss';
import TextField from '../TextField';
import NumberField from '../NumberField';
import DropdownField from '../DropdownField';
import SubmittedData from '../SubmittedData';

interface FormField {
  default_value?: string | number | boolean;
  value?: string | number | boolean;
  validation?: string;
  min_value?: number;
  max_value?: number;
  options?: string[] | number[];
  type: 'text' | 'longtext' | 'dropdown' | 'number';
}

const ValidationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormField[]>([]);
  const [submittedData, setSubmittedData] = useState<object | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setFormData(data));
  }, []);

  const generateValidationSchema = (fields: FormField[]) =>
    Yup.object().shape(
      fields.reduce((schema, { type, validation, min_value, max_value, options }, index) => {
        const fieldKey = `field${index}`;
        switch (type) {
          case 'text':
            if (validation === '^[a-zA-Z]+$') {
              schema[fieldKey] = Yup.string()
                .matches(/^[a-zA-Z]+$/, {
                  message: `Field ${index + 1} must contain only letters (no spaces or special characters).`,
                  excludeEmptyString: true
                })
                .min(1, `Field ${index + 1} must be at least 1 character long.`)
                .required(`Field ${index + 1} is required.`);
            } else {
              schema[fieldKey] = Yup.string().required(`Field ${index + 1} is required.`);
            }
            break;
          case 'longtext':
            schema[fieldKey] = Yup.string()
              .max(500, `Field ${index + 1} must be at most 500 characters long.`)
              .required(`Field ${index + 1} is required.`);
            break;
          case 'dropdown':
            schema[fieldKey] = Yup.string()
              .required(`Field ${index + 1} is required.`);
            break;
          case 'number':
            schema[fieldKey] = Yup.number()
              .typeError(`Field ${index + 1} must be a number.`)
              .min(min_value || 0, `Field ${index + 1} must be at least ${min_value}.`)
              .max(max_value || 100, `Field ${index + 1} must be at most ${max_value}.`)
              .required(`Field ${index + 1} is required.`);
            break;
          default:
            break;
        }
        return schema;
      }, {} as Record<string, any>)
    );

  const renderField = (field: FormField, index: number) => {
    const fieldKey = `field${index}`;
    switch (field.type) {
      case 'text':
      case 'longtext':
        return <TextField key={index} fieldKey={fieldKey} index={index} type={field.type} value={field.value || field.default_value || ''}/>;
      case 'number':
        return <NumberField key={index} fieldKey={fieldKey} index={index} value={field.value || field.default_value || ''}/>;
      case 'dropdown':
        return <DropdownField key={index} fieldKey={fieldKey} index={index} options={field.options || []} value={field.value || field.default_value || ''}/>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSection}>
        <h1>Dynamic Validation Form</h1>
        {formData.length > 0 && (
         <Formik
         initialValues={formData.reduce(
           (acc, field, index) => ({
             ...acc,
             [`field${index}`]: field.value !== undefined ? field.value : field.default_value || '',
           }),
           {} as Record<string, any>
         )}
         validationSchema={generateValidationSchema(formData)}
         onSubmit={(values) => setSubmittedData(values)}
       >       
            {() => (
              <Form>
                {formData.map((field, index) => renderField(field, index))}
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {submittedData  && <div className={styles.resultSection}> <SubmittedData data={submittedData} /> </div>}
    </div>
  );
};

export default ValidationForm;