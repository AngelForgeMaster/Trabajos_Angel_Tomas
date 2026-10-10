import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server"
import { orderBy } from "lodash";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    /*const { userId } = auth();
    if (!userId) {
        return new NextResponse("unauthorized", { status: 401 })
    }*/
    try {
        const body = await req.json();
        const product = await db.product.create({
            data: body,
        });
        return NextResponse.json(product)
    } catch (error) {
        console.log("[ERROR_API]", error); // Imprime en tu terminal de VS Code

        // DEVUELVE EL ERROR EN FORMATO JSON PARA QUE POSTMAN LO LEA
        return NextResponse.json({
            error: error instanceof Error ? error.message : error
        }, { status: 500 });
    }
}

export async function GET() {
    /*const { userId } = await auth();
    if (!userId) {
        return new NextResponse("unauthorized", { status: 401 })
    }*/
    try {
        const products = await db.product.findMany({
            orderBy: {
                name: "asc",
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.log(error)
        return new NextResponse("error fatching products: ", { status: 500 })
        return new NextResponse("error get products: ", { status: 500 })
    }
}