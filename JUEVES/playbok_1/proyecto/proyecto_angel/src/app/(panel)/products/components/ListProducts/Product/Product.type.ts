import { productModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type ProductProps = {
    product: productModel;
    setEditProduct?: any;
    setDeleteProduct?: any;
};