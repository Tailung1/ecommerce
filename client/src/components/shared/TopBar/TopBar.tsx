import styles from "./TopBar.module.scss";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import teleCall from "../../../assets/telephone-call.png";

const navigationItems = [
  {
    label: "Trade Politics",
    href: "/trade-politics",
  },
  {
    label: "Installment",
    href: "/installment",
  },
  {
    label: "Career",
    href: "/career",
  },
  {
    label: "Trade In",
    href: "/trade-in",
  },
  {
    label: "Branches",
    href: "/branches",
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
          {navigationItems.map(({ label, href }) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>

        <LanguageSelector />
      </div>
    </div>
  );
}
