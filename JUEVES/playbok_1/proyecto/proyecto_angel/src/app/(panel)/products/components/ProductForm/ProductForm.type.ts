import { productModel } from "@/models";

export type ProductFormProps = {
    editProduct?: productModel;
    onCloseForm: () => void;
    onReload: () => Promise<void>;
}