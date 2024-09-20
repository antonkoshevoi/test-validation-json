import React, { useState, useMemo, useCallback } from "react";
import { Formik, Form } from "formik";
import styles from "./index.module.scss";
import SubmittedData from "../SubmittedData";
import { initializeFormValues, getValidationSchema } from "../../utils/helpers";
import { FieldRenderer } from "../FieldRenderer";
import { FORM_DATA } from "../../mock/formData";

const ValidationForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<object | null>(null);

  const initialValues = useMemo(() => initializeFormValues(FORM_DATA), []);
  const validationSchema = useMemo(() => getValidationSchema(FORM_DATA), []);
  
  const handleSubmit = useCallback((values: React.SetStateAction<object | null>) => {
    setSubmittedData(values);
  }, []);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSection}>
        <h1>Dynamic Validation Form</h1>

        {FORM_DATA.length > 0 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {FORM_DATA.map((field, index) => (
                <FieldRenderer key={index} field={field} index={index} />
              ))}

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        )}
      </div>

      {submittedData && (
        <div className={styles.resultSection}>
          <SubmittedData data={submittedData} />
        </div>
      )}
    </div>
  );
};

export default ValidationForm;