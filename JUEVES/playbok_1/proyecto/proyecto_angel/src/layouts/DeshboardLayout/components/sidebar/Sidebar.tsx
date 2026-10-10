"use client";
import styles from "./sidebar.module.scss"
import { Package2 } from "lucide-react"
import Link from "next/link"
import { Button, Sheet, SheetTrigger } from "@/components/ui"
import { useAuth } from "@clerk/nextjs"
import { menuData } from "../menu.data";
import { map } from "lodash"
export function Sidebar() {
    const { signOut } = useAuth();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <Link href="/" className={styles.nameApp} />
                    <Package2 className={styles.iconApp} />
                    <span>Manager stock</span>
                </div>
                <div className={styles.body}>
                    <nav className={styles.menu}>
                        {map(menuData, (item) => (
                            <Link key={item.id} href={item.link} className={styles.item}>
                                <item.icon className={styles.iconItem} />
                                {item.title}</Link>
                        ))}
                    </nav>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.btnLogout} onClick={() => signOut()}>cerrar sesion</Button>
                </div>
            </div>
        </div>
    )
}
