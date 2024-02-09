"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './menuLink.module.css'
const MenuLink = ({item}) => {
    const pathname = usePathname()
    console.log(pathname);
  return (
    <Link  href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}` }>
      {item.icon}
      <span>{item.title}</span>
    </Link>
  )
}

export default MenuLink
