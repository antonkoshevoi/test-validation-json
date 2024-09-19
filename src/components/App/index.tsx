import styles from "./index.module.scss";
import ValidationForm from "../ValidationForm";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p>
          Test project
        </p>
      </header>

      <body>
        <ValidationForm />
      </body>
    </div>
  );
}

export default App;
