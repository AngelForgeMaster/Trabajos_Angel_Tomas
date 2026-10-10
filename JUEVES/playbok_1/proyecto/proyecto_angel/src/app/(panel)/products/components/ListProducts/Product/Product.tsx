import { ProductProps } from "./Product.type";
import { TableCell, TableRow, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "@/components/ui";
import styles from "./Product.module.scss"
import { MoreHorizontal } from "lucide-react";


export function Product(props: ProductProps) {
    const { product, setEditProduct, setDeleteProduct } = props; // Convención minúscula

    return (
        <TableRow>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.note}</TableCell>
            <TableCell className={styles.actions}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={styles.btnOptions}>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditProduct(product)} className={styles.btnEdit}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteProduct(product)} className={styles.btnOnDelete}>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow >
    )
}