'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdOutlineSettings,
  MdPeople,
  MdSearch,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork
} from "react-icons/md";
import secureLocalStorage from 'react-secure-storage';
import MenuLink from './menuLink/menuLink';
import styles from './sidebar.module.css';
import { useMemo } from "react";
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
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
const Sidebar = () => {
  const router = useRouter();

  const user = useMemo(() => secureLocalStorage.getItem("user"), []);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.userTitle}>
            <b>{user?.name}</b>
          </span>
          <span className={styles.userTitle}>
            <small>{user?.email}</small>
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {" "}
        {menuItems.map((item) => (
          <li key={item.title}>
            <span className={styles.cat}>{item.title}</span>
            {item.list.map((listItem) => (
              <MenuLink item={listItem} key={listItem.title} />
            ))}
          </li>
        ))}
      </ul>
      <button
        className={styles.logout}
        onClick={() => {
          secureLocalStorage.clear();
          router.push("/login");
        }}
      >
        <MdSearch />
        Logout
      </button>
    </div>
  );
};

export default Sidebar
