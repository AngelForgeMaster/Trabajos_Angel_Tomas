import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui";
import { BasicModalProps } from "./BasicModal.type";
import styles from "./BasicModal.module.scss"
import { cn } from "@/lib/utils";


export function BasicModal(props: BasicModalProps) {
    const { children, open = false, onClose, title, size = "small" } = props;


    const getStylesSize = () => {
        switch (size) {
            case "medium":
                return styles.modalMedium;
            case "large":
                return styles.modalLarge;
            default:
                return styles.modalSmall;
        }
    };


    return (
        <Dialog open={open}>
            <DialogContent
                onInteractOutside={onClose}
                className={cn(styles.container, getStylesSize())}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>


                {children}
            </DialogContent>
        </Dialog>
    );
}

