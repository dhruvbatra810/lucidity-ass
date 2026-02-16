import Card from "../../components/card";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import {type Summary} from "./inventorySection"


const cards = [
    {id: "totalProduct",heading: "Total Products",icon:<><MdOutlineShoppingCart /></>},
    {id: "totalStoreValue",heading: "Total Store Value",icon:<><MdOutlinePriceCheck /></>},
    {id: "outOfStock",heading: "Total Out of Stock",icon:<><MdOutlineRemoveShoppingCart /></>},
    {id: "numberOfCategories",heading: "No of Category",icon:<><MdOutlineCategory /></>},
]
export default function CardGroup({summary}:{summary:Summary}){
    return <div className="flex gap-5 w-full flex-wrap">
        {cards.map((card,id)=> <Card heading={card.heading} icon={card.icon}  value={ (card.id === 'totalStoreValue' ? '$': '') + String(summary[card.id as keyof typeof summary] || 0)} key={id}/> )}
    </div>
}