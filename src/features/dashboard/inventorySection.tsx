import CardGroup from "./cardGroup";
import { useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import InventoryTable from "../../components/inventoryTable";
import { ERROR_MESSAGE, INVENTORY_STATS_HEADING, LOADING_TEXT } from "../../utils/constant";


export interface Summary {
    totalProduct: number,
    totalStoreValue: number,
    outOfStock: number,
    numberOfCategories: number,
}

export default function Inventory() {
    const { error, items, loading } = useAppSelector((state) => state.inventory)
    const [summary, setSummary] = useState<Summary>({
        totalProduct: 0,
        totalStoreValue: 0,
        outOfStock: 0,
        numberOfCategories: 0
    });

    useEffect(() => {
        const totalProduct =items.reduce((acc,item)=>{ 
            if(item.isDisabled) return acc;
            return acc+1;
        },0);
        const totalStoreValue = items.reduce((sum, item) => {
            if(item.isDisabled) return sum;
            return sum + item.price * item.quantity}, 0);
        const outOfStock = items.filter(item => item.quantity === 0 || item.isDisabled).length;
        const numberOfCategories = new Set(items.filter(item =>!item.isDisabled).map(item => item.category)).size;

        setSummary({ totalProduct, totalStoreValue, outOfStock, numberOfCategories });
    }, [items]);

    return <div className="flex flex-col mt-4 px-4">
        <h1 className="mb-3 text-5xl">{INVENTORY_STATS_HEADING}</h1>
        {error && ERROR_MESSAGE}
        {!error && (loading ? LOADING_TEXT : <div className="flex flex-col gap-4">
            <CardGroup summary={summary} />
            <InventoryTable products={items}/>
        </div>)}
    </div>
}