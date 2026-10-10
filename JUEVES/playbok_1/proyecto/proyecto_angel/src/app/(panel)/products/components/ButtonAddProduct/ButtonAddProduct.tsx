"use client";
import { BasicModal } from "@/components/shared";
import styles from "./ButtonAddProduct.module.scss";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { ButtonAddProductProps } from "./ButtonAddProduct.type";
import { ProductForm } from "../ProductForm";

export function ButtonAddProduct(props: ButtonAddProductProps) {
    const { editProduct, setEditProduct, onReload } = props;
    const [openModal, setOpenModal] = useState(false);

    // Efecto para abrir el modal si seleccionaste "Editar" en los 3 puntos
    useEffect(() => {
        if (editProduct) {
            setOpenModal(true);
        }
    }, [editProduct]);

    // Función para el botón (+) Añadir producto
    const onOpenCreateModal = () => {
        setEditProduct(undefined); // Ahora TypeScript sí acepta undefined gracias a tu type.ts
        setOpenModal(true);
    };

    // Función para cerrar el modal y limpiar
    const onCloseModal = () => {
        setOpenModal(false);
        setEditProduct(undefined);
    };

    return (
        <>
            
                <Button onClick={onOpenCreateModal} className={styles.button}>  
                    <Plus /> 
                </Button>
            

            <BasicModal 
                open={openModal} 
                onClose={onCloseModal}
                title={editProduct ? `Editar: ${editProduct.name}` : "Nuevo producto"}
            >
                <ProductForm 
                    editProduct={editProduct} 
                    onReload={onReload} 
                    onCloseForm={onCloseModal} 
                />
            </BasicModal>
        </>
    );
}