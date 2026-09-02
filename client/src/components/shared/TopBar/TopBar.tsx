import styles from "./TopBar.module.scss";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import teleCall from "../../../assets/telephone-call.png";
import { Link } from "react-router-dom";

const navigationItems = [
  {
    label: "Trade Politics",
    to: "/trade-politics",
  },
  {
    label: "Installment",
    to: "/installment",
  },
  {
    label: "Career",
    to: "/career",
  },
  {
    label: "Trade In",
    to: "/trade-in",
  },
  {
    label: "Branches",
    to: "/branches",
  },
];

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.contactInfo}>
        <img src={teleCall} alt='Telephone call icon' width={18} height={18} />
        <span>*7007</span>
      </div>

      <div className={styles.infoContainer}>
        <nav aria-label='Top navigation'>
          {navigationItems.map(({ label, to }) => (
            <Link to={to} key={label}>
              {label}
            </Link>
          ))}
        </nav>

        <LanguageSelector />
      </div>
    </div>
  );
}
