import { Dispatch, SetStateAction } from "react"
import { productModel } from "@/models"

export type ListProductsProps = {
    products: productModel[];
    setEditProduct?: any; 
    onReload: () => void;

}