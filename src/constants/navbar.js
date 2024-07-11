import { GrEmoji } from "react-icons/gr";
import {
  MdDashboard,
  MdFace,
  MdAddShoppingCart,
  MdAddchart,
  MdSettings,
  MdLocalOffer,
} from "react-icons/md";

export const navBarLinks = [
  {
    id: 1,
    label: "Home",
    route: "home",
    icon: <GrEmoji />,
  },
  { id: 2, label: "Categories", route: "categories", icon: <MdDashboard /> },
  { id: 3, label: "Products", route: "products", icon: <MdLocalOffer /> },
  { id: 3, label: "Users", route: "users", icon: <MdFace /> },

  { id: 4, label: "Orders", route: "orders", icon: <MdAddShoppingCart /> },
  { id: 5, label: "Charts", route: "charts", icon: <MdAddchart /> },

  {
    id: 6,
    label: "Settings",
    route: "settings",
    icon: <MdSettings />,
  },
];
