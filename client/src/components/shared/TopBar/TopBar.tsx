import styles from  "./TopBar.module.scss";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import teleCall from "../../../assets/telephone-call.png";


export default function TopBar() {
  return (
    <div className={styles["pc-topBar"]}>
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
