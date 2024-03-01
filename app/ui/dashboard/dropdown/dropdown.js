import { useState } from "react";
import {
  MdAnalytics,
  MdAttachMoney,
  MdClose,
  MdDashboard,
  MdMenuOpen,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
} from "react-icons/md";
import MenuLink from "../sidebar/menuLink/menuLink";
import styles from "./dropdown.module.css"; // Import the styles
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Properties",
        path: "/dashboard/property",
        icon: <MdShoppingBag />,
      },
      {
        title: "Subscription",
        path: "/dashboard/subscription",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Bookings",
        path: "/dashboard/bookings",
        icon: <MdWork />,
      },
      {
        title: "Tenancies",
        path: "/dashboard/tenancies",
        icon: <MdAnalytics />,
      },
      // {
      //   title: "Teams",
      //   path: "/dashboard/teams",
      //   icon: <MdPeople />,
      // },
    ],
  },
  // {
  //   title: "User",
  //   list: [
  //     {
  //       title: "Settings",
  //       path: "/dashboard/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Help",
  //       path: "/dashboard/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    // Perform any action when an item is clicked
    // For now, let's just close the dropdown
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdown} ${isOpen ? "open" : ""}`}>
      <button onClick={toggleDropdown} className={styles.dropdown_button}>
        {isOpen ? (
          <MdClose fill="#d5770a" size={20} />
        ) : (
          <MdMenuOpen fill="#d5770a" size={20} />
        )}
      </button>
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={toggleDropdown}></div>
          <ul className={styles.dropdown_menu}>
            {" "}
            {menuItems.map((item) => (
              <li key={item.title} onClick={toggleDropdown}>
                <span className={styles.cat}>{item.title}</span>
                {item.list.map((listItem) => (
                  <MenuLink item={listItem} key={listItem.title} />
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
