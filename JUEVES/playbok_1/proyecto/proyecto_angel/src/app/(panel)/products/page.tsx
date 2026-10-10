"use client";
import { useEffect, useState } from "react";
import { productCtrl } from "@/api";
import { productModel } from "@/models"
import { Skeleton } from "@/components/shared/loading";
import { ListProducts } from "./components/ListProducts/ListProducts"
import { ButtonAddProduct } from "./components";


export default function productPage() {
    const [products, setProducts] = useState<productModel[] | null>(null);

    const [editProduct, setEditProduct] = useState<productModel | undefined>(undefined);

    

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await productCtrl.getAll();
            setProducts(response);
        } catch (error) {
            console.log(error)
        }
    };

    const handleOpenAddModal = () => {
        setEditProduct(undefined); // <-- IMPORTANTE: Limpia el producto para que abra vacio
    };

    if (!products) return <Skeleton.List />

    return (
        <div>
            <ButtonAddProduct
                onReload={getProducts}
                setEditProduct={setEditProduct}
                editProduct={editProduct}
                 />
            <ListProducts
                products={products}
                onReload={getProducts}
                setEditProduct={setEditProduct} />
        </div>
    )

}



