import { SignIn } from "@clerk/nextjs";
import styles from "./login.module.scss"

export function Login() {
    return (
        <div className={styles.container}>
            <SignIn appearance={{ elements: { footer: { display: "none" } } }} routing="hash" />
        </div>
    )
}
