import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <h1>E-Dashboard</h1>
      </div>
      <div className={styles.buttons}>
        <button className={styles.loginBtn}>Login</button>
      </div>
    </div>
  );
};

export default Header;
