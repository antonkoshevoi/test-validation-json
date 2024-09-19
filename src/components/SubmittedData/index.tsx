import React from 'react';
import styles from './index.module.scss';

interface SubmittedDataProps {
  data: Record<string, any>;
}

const SubmittedData: React.FC<SubmittedDataProps> = ({ data }) => (
  <div className={styles.submittedData}>
    <h2>Submitted Data:</h2>
    <ul>
      {Object.entries(data).map(([key, value], index) => (
        <li key={index} className={styles.submittedDataItem}>
          <strong>{key}:</strong> {String(value)}
        </li>
      ))}
    </ul>
  </div>
);

export default SubmittedData;