import styles from "./styles.module.scss";
import { navBarLinks } from "../../constants/navbar";

const Menu = ({ setRoute }) => {
  return (
    <ul className={styles.main}>
      {navBarLinks.map((item) => (
        <div key={item.id} onClick={() => setRoute(item.route)} className={styles.listDiv}>
          <p className={styles.icons}>{item.icon}</p>
          <li className={styles.list} icon={item.icon}>
            {item.label}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default Menu;
