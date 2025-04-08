import connection from './connection.js'

const getItems = async () => {
    const [result] = await connection.query("SELECT * FROM Item")  
    return result; 
}
const getItemByID = async (id) => { 
    const [result] = await connection.query("SELECT * FROM Item WHERE item_id = ? ", [id])
    return result; 
}
const getItemsBasedOnCategory = async (category_name) => { 
    const [result] = await connection.query("SELECT Item.item_id,Item.item_name,Item.item_description,Item.item_price,Item.item_stock_quantity, Category.category_name FROM Item JOIN Category ON Item.category_id = Category.category_id WHERE Category.category_name = ?", 
        [category_name]
    )
    return result; 
}
const addItem = async (category_id,item_name, item_description, item_price, item_stock_quantity) => { 
    const [result] = await connection.query("INSERT INTO Item (category_id, item_name, item_description, item_price, item_stock_quantity) VALUES (?, ?, ?, ?, ?)", 
        [category_id, item_name, item_description, item_price, item_stock_quantity]
    )
    if (result.affectedRows === 0) {
        return null; 
    }
    else { 
        return await getItemByID(result.insertId); 
    }
}
const updateItem = async (item_name, item_description , item_price, item_stock_quantity, category_id , id) => { 
    
    const [result] = await connection.query("UPDATE Item SET item_name = ?, item_description = ?, item_price = ?, item_stock_quantity = ?, category_id = ? WHERE item_id = ?", 
        [item_name, item_description , item_price, item_stock_quantity, category_id , id]
    )

    if (result.affectedRows === 0) { 
        return null; 
    } else { 
        return await getItemByID(id); 
    }
}
const deleteItem = async (id) => { 
    const itemBeingDeleted = getItemByID(id); 
    const [result]  = await connection.query("DELETE FROM Item WHERE item_id = ?", [id]); 
    if (result.affectedRows === 0) { 
        return null; 
    } else { 
        return await itemBeingDeleted; 
    }
}
export default {getItems , getItemsBasedOnCategory, addItem, updateItem, deleteItem};