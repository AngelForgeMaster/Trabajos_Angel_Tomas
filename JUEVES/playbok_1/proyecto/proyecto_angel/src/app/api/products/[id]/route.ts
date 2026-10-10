import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib";
import { NextResponse } from "next/server";


// PATCH (Actualizar producto)

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        //  (Opcional) Autenticación
        /*
        const { userId } = await auth();
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
        */

        const { id } = await params; // Resolvemos la promesa de params
        const body = await req.json();

        if (!id) {
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const updatedProduct = await db.product.update({
            where: {
                id: id,
            },
            data: body,
        });

        return NextResponse.json(updatedProduct);

    } catch (error) {
        console.error("[PRODUCT_PATCH_ERROR]", error);
        return new NextResponse("Error updating product", { status: 500 });
    }
}


// DELETE (Eliminar producto)

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        //  (Opcional) Autenticación
        /*
        const { userId } = await auth();
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
        */

        const { id } = await params; // Resolvemos la promesa de params

        if (!id) {
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const deletedProduct = await db.product.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(deletedProduct);

    } catch (error) {
        console.error("[PRODUCT_DELETE_ERROR]", error);
        return new NextResponse("Error deleting product", { status: 500 });
    }
}