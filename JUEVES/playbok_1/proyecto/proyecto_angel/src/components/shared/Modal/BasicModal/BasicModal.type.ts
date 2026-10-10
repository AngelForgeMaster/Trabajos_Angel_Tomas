export type BasicModalProps = {
    title: string,
    open: boolean,
    onClose: () => void;
    children: React.ReactNode;
    size?: "smal" | "medium" | "large";
}

