import { z } from "zod"
import { productModel } from "@/models"

export function initialValues(product: productModel | undefined) {
    return {
        name: product?.name || "",
        note: product?.note || "",
    };
}

export const validationShame = z.object({
    name: z.string().min(2, { message: "Minimo 2 caracteres" }),
    note: z.string(),
});