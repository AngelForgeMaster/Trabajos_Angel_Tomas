export type ConfirmModalProps = {
    title: string,
    description?: string,
    onConfirm: () => void;
    onCancel: () => void;
    open: boolean;
    danger?: boolean;
}