import { LoaderCircle } from "lucide-react"
import styles from "./ConfirmModal.module.scss"
import { ConfirmModalProps } from "./ConfirmModal.type"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
export function ComFirmModal(props: ConfirmModalProps) {
    const { title, description, onConfirm, onCancel, open, danger } = props
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) setLoading(false);
    }, [open])

    const onConfirmAction = () => {
        setLoading(true);
        onConfirm();
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description && (
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>cancelar </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirmAction} className={cn(danger && styles.btnDanger)}>
                        {loading ? <LoaderCircle className={styles.load} /> : "continuar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
