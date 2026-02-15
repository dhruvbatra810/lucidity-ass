import { inventoryData } from "../utils/constant";

export async function getInventory(timeout = 400){
    // throw new Error('error')
    await new Promise((res)=>{
        setTimeout(()=>{res(null)},timeout)
    })
    return inventoryData;
}