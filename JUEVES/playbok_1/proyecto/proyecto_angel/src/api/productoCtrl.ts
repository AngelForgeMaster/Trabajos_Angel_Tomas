import { ENV } from "@/utils"
import { productModel } from "@/models";
import { method } from "lodash";

async function getAll(): Promise<productModel[]> {
    const url = `${ENV.API_URL}/products`
    const response = await fetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
}

async function create(product: any): Promise<productModel> {
    const url = `${ENV.API_URL}/products`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    };
    const response = await fetch(url, params);
    if (response.status !== 200) throw response;

    return await response.json()

}
async function update(productId: string, values: any): Promise<void> {
    const url = `${ENV.API_URL}/products/${productId}`;
    const params = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    };
    const response = await fetch(url, params);

    if (response.status !== 200) throw response;
    return await response.json();

}

async function remove(productId: string): Promise<void> {
    const url = `${ENV.API_URL}/products/${productId}`;
    const params = {
        method: "DELETE",
    };
    const response = await fetch(url, params);

    if (response.status !== 200) throw response;

}
export const productCtrl = {
    getAll,
    create,
    update,
    remove,
};