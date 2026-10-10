import styles from "./Loading.module.scss"
import { loadingProps } from "./Loading.types"
import { LoaderCircle } from 'lucide-react';
import { cn } from "@/lib/utils"
export function Loading(props: loadingProps) {
  const { full } = props;
  return (
    <div className={cn(styles.content, full && styles.fullContent)}>
      <LoaderCircle className={styles.spinner} />
      <p>cargando</p>
    </div>
  )
}
