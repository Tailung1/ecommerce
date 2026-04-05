import LanguageSelector from "../shared/LanguageSelector";
import teleCall from "../../assets/telephone-call.png";
import styles from "../../css/FirstSection.module.scss";

export default function FirstSection() {
  return (
    <div className={styles["pc-first-section"]}>
      <div className={styles["contact-info"]}>
        <img src={teleCall} alt='telephone call icon' />
        <span>*7007</span>
      </div>
      <div className={styles["info-container"]}>
        <nav>
          <span>Trade Politics</span>
          <span>Installment</span>
          <span>Carrer</span>
          <span>Trade In</span>
          <span>Branches</span>
        </nav>
        <LanguageSelector />
      </div>
    </div>
  );
}
