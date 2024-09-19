import React, { useState } from "react";
import { Formik, Form } from "formik";
import styles from "./index.module.scss";
import SubmittedData from "../SubmittedData";
import { initializeFormValues, getValidationSchema } from "../../utils/helpers";
import { FieldRenderer } from "../FieldRenderer";
import { FORM_DATA } from "../../mock/formData";

const ValidationForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<object | null>(null);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSection}>
        <h1>Dynamic Validation Form</h1>

        {FORM_DATA.length > 0 && (
          <Formik
            initialValues={initializeFormValues(FORM_DATA)}
            validationSchema={getValidationSchema(FORM_DATA)}
            onSubmit={(values) => setSubmittedData(values)}
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
