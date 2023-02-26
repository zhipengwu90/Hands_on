import { createContext, useState } from "react";


export const ItemDataContext = createContext({
    itemData: [],
    setItemData: ()=>{},
});

const ItemDataProvider =({children})=>{
    const [data, setData] = useState([])

    function setItemData(data){
        setData(data);
    }

    const value = {
        itemData: data,
        setItemData: setItemData,
    }
    return (
        <ItemDataContext.Provider value ={value}>
            {children}
        </ItemDataContext.Provider>
    )
}

export default ItemDataProvider;