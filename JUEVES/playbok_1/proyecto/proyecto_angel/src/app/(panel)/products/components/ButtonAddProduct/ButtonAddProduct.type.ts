import { productModel } from "@/models"
import { Dispatch, SetStateAction } from "react"

export type ButtonAddProductProps = {
    editProduct?: productModel;
    setEditProduct: Dispatch<SetStateAction<productModel | undefined>>
    onReload: () => Promise<void>;

}