import styles from "./TopBar.module.scss";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import teleCall from "../../../assets/telephone-call.png";

const navigationItems = ["Trade Politics", "Installment", "Career", "Trade In", "Branches"];

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.contactInfo}>
        <img src={teleCall} alt='Telephone call icon' width={18} height={18} />
        <span>*7007</span>
      </div>

      <div className={styles.infoContainer}>
        <nav>
          {navigationItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>

        <LanguageSelector />
      </div>
    </div>
  );
}
