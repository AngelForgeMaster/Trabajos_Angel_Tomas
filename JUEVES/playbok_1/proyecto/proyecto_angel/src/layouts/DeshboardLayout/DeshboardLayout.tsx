import { DeshboardLayoutProps } from "./DeshboardLayout.types";
import styles from "./DeshboardLayout.module.scss"
import { Sidebar } from "./components"
import { TopBar } from "./components/TopBar";
export function DeshboardLayout(props: DeshboardLayoutProps) {
    const { children } = props;
    return (
        <div className={styles.container}>
            <Sidebar />
            <div>
                <div className={styles.content}>TopBar</div>
                <TopBar />
                <main>{children}</main>
            </div>
        </div>

    )
}