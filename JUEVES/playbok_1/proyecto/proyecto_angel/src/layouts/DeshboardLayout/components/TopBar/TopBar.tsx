"use client";
import styles from "./topbar.module.scss"
import { Menu, LogOut, Package2 } from "lucide-react"
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui"
import Link from "next/link";
import { useAuth } from "@clerk/nextjs"
import { map } from "lodash"
import { menuData } from "../menu.data";

export function TopBar() {
    const { signOut } = useAuth();
    return (
        <header className={styles.container}>
            <div className={styles.leftContainer}>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="secondary" size="icon" className={styles.btnMenuMobile}>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className={styles.sheetContainer}>
                        <SheetHeader>
                            <SheetTitle>Menú</SheetTitle>
                        </SheetHeader>


                        <nav className={styles.menuMobile}>
                            <Link href="/" className={styles.logoApp}>
                                <span>Manager Stock</span>
                            </Link>
                            {map(menuData, (item) => (
                                <Link key={item.id} href={item.link} className={styles.itemMenu}>
                                    <item.icon />
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            <div>
                <h2 className={styles.nameApp}>Manager stock</h2>
            </div>
            <div className={styles.leftContent}>
                <Button variant="secondary" size="icon" className={styles.btnLogout} onClick={() => { signOut() }}>
                    <LogOut className={styles.iconLogout} />
                </Button>
            </div>
        </header >
    )
}
