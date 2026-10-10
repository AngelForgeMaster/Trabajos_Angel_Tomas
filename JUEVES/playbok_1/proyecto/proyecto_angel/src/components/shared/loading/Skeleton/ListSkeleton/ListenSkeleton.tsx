import { Skeleton } from "@/components/ui";
import styles from "./ListenSkeleton.module.scss"
import { ListSkeletonProps } from "./ListenSkeleton.types";
export function ListSkeleton(props: ListSkeletonProps) {
    const { totalRender = 1 } = props;

    return (
        <div className={styles.container}>
            {Array.from({ length: totalRender }, (_, index) => (
                <div className={styles.item} key={index}>
                    <div className={styles.textContainer}>
                        <Skeleton className={styles.textTop} />
                        <Skeleton className={styles.textBottom} />
                    </div>
                </div>

            ))}
        </div>

    )
}