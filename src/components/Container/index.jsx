import { useState } from "react";
import styles from "./styles.module.scss";
import Menu from "../Menu";
import Home from "../Home";
import Categories from "../Categories";
import Products from "../Products";
import Order from "../Orders";

const MainContainer = () => {
  const [route, setRoute] = useState("home");

  const changeRoute = (routeParam) => {
    setRoute(routeParam);
  };

  return (
    <div className={styles.main}>
      <div className={styles.sxColumn}>
        <Menu setRoute={changeRoute} />
      </div>
      <div className={styles.dxColumn}>
        {route === "home" && <Home />}
        {route === "users" && <div>Users</div>}
        {route === "orders" && <Order/>}
        {route === "charts" && <div>Charts</div>}
        {route === "products" && <Products />}
        {route === "categories" && <Categories />}
        {route === "settings" && <div>Settings</div>}
      </div>
    </div>
  );
};

export default MainContainer;
