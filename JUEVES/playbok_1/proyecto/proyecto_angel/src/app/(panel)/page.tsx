/*import { menuPage } from "./menu.page"
import { Button } from "@/components/ui"
import { useAuth } from "@clerk/nextjs"
import { map } from "lodash"
import Link from "next/link"
import styles from "@/layouts/DeshboardLayout/components/sidebar/sidebar.module.scss"
export function HomePage() {
    const { signOut } = useAuth();
    return (
        <div className={styles.container} >
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Inicio</h1>
                    <nav className={styles.menu}>{
                        map(menuPage, (item) => (
                            <Link key={item.id} href={item.link} className={styles.item}>
                                <item.icon className={styles.iconItem} />
                                {item.title}</Link>
                        ))}
                    </nav>
                    <Button className={styles.btnLogout} onClick={() => signOut()}>cerrar sesion</Button>
                </div>
            </div>
        </ div>
    )
}*/
"use client";
import styles from "@/layouts/DeshboardLayout/components/TopBar/topbar.module.scss"
import { Menu, LogOut, Package2 } from "lucide-react"
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui"
import Link from "next/link";
import { useAuth } from "@clerk/nextjs"
import { map } from "lodash"
import { menuData } from "@/layouts/DeshboardLayout/components/menu.data";


export function HomePage() {
    const { signOut } = useAuth();
    return (
        <header className={styles.container}>
            <div className={styles.leftContainer}>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="secondary" size="icon" className={styles.btnMenuMb}>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className={styles.sheetContainer}>
                        <SheetHeader>
                            <SheetTitle>Menú</SheetTitle>
                        </SheetHeader>


                        <nav className={styles.menuMobile}>
                            <Link href="/" className={styles.logoApp}>
                                <Package2 />
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


