import React from "react";
import styles from "./index.module.scss";

type SubmittedDataProps = {
  data: Record<string, any>;
};

const SubmittedData: React.FC<SubmittedDataProps> = (props) => {
  const { data } = props;

  return (
    <div className={styles.submittedData}>
      <h2>Submitted Data:</h2>

      <ul>
        {Object.entries(data).map(([key, value], index) => (
          <li key={index} className={styles.submittedDataItem}>
            <strong>Field {index+1}:</strong> {String(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedData;
