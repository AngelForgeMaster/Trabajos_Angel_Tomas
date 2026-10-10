"use client";
import styles from "./ProductForm.module.scss";
import { ProductFormProps } from "./ProductForm.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@/components/ui";
import { initialValues, validationShame } from "./ProductForm.form";
import { productCtrl } from "@/api";
import { toast } from "sonner";
import { z } from "zod";

export function ProductForm(props: ProductFormProps) {
    const { editProduct, onCloseForm, onReload } = props;

    const { handleSubmit, register } = useForm({
        defaultValues: initialValues(editProduct),
        resolver: zodResolver(validationShame)
    });

    const onSubmit = async (values: z.infer<typeof validationShame>) => {
        try {
            if (editProduct) {
                await productCtrl.update(editProduct.id, values);
                toast.success("El producto ha sido editado correctamente")
            } else {
                await productCtrl.create(values);
                toast.success("El producto ha sido creado correctamente")
            }

            await onReload();
            onCloseForm();

        } catch (error) {
            console.error(error);
            toast.error("Error al crear el producto")
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <Input
                {...register("name")}
                placeholder="Nombre del producto"
                className={styles.input}
            />

            <Textarea
                {...register("note")}
                placeholder="Escribe una nota sobre el producto"
                className={styles.input}
            />

            <Button type="submit" className={styles.btnSubmit}>
                {editProduct ? "Actualizar producto" : "Crear producto"}
            </Button>
        </form>
    );
}