import { useState } from "react";
import styles from "./styles.module.scss";
import Menu from "../Menu";
import Home from "../Home";
import Categories from "../Categories";
import Products from "../Products";
import Order from "../Orders";
import User from "../Users";
import Chart from "../Charts";

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
        {route === "users" && <User/>}
        {route === "orders" && <Order/>}
        {route === "charts" && <Chart />}
        {route === "products" && <Products />}
        {route === "categories" && <Categories />}
        {route === "settings" && <div>Settings</div>}
      </div>
    </div>
  );
};

export default MainContainer;
