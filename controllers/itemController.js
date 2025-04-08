import itemsDataBase from "./../database/itemsDb.js"

export const getItems = async (req, res) => { 
    const items = await itemsDataBase.getItems(); 
    if (items.length !== 0) { 
        res.status(200).json({ 
            message: "successfully retrieve the data ", 
            items 
        })
    } else { 
        res.status(404).json({ 
            message: "Items not found "
        })
    }
}

export const getItemsBasedOnCategory = async (req, res) => { 
    const itemsWithCategories = await itemsDataBase.getItemsBasedOnCategory(req.params.category_name); 
    if (itemsWithCategories.length !== 0) { 
        res.status(200).json({ 
            message: "Successfully retreived data with categories",
            itemsWithCategories
        })
    } else {
        res.status(404).json({ 
            message: "Items not found."
        })
    }
}

export const addItem = async (req, res) => {
    const {category_id, item_name, item_description ,item_price , item_stock_quantity} = req.body; 
    console.log(category_id , item_name , item_description, item_price, item_stock_quantity)
    const item = await itemsDataBase.addItem(category_id,item_name, item_description, item_price,item_stock_quantity); 
    if (item !== null) {
        const itemProp = item[0]; 
        if( itemProp.category_id === null || 
            itemProp.item_name === null || 
            itemProp.item_description === null || 
            itemProp.item_price === null ||
            itemProp.item_stock_quantity === null )
        { 
            res.status(400).json({ 
                message: "Bad request, the require fields are missing."
            })
        } else { 
            res.status(201).json({ 
                message: `${itemProp.item_name} was created`, 
                itemProp
            })
        }
    } else {
        res.status(404).json({ 
            message: "Not found"
        })
    }
}

export const updateItem = async (req, res) => { 
    let id = parseInt(req.params.id); 

    const { item_name, item_description, item_price, item_stock_quantity, category_id } = req.body; 
    const result = await itemsDataBase.updateItem(item_name, item_description, item_price, item_stock_quantity, category_id, id); 
    if (result === null) { 
        res.status(404).json({ 
            message: "The item is not found and not updated."
        })
    } else { // the result is not null 
        const item = result[0]; 
        if (item.item_name == null || 
            item.item_description === null || 
            item.item_price === null || 
            item.item_stock_quantity === null || 
            item.category_id === null
        ) { 
            res.status(400).json({ 

                message: "the fields required are missing and item not updated "
            })
        } else {
            res.status(200).json({ 
                message: `${item.item_name} updated `, 
                item
            })
        }
    }
}

export const deleteItem = async (req, res ) => { 
    const id = parseInt(req.params.id); 
    if (!Number.isInteger(id)) {
        res.status(400).json({
            message: "Bad request, the id needs to be a number"
        })
    } else {
        const result = await itemsDataBase.deleteItem(id);
        if (result !== null) {
            const item = result[0];
            res.status(200).json({
                message: `${item.item_name} was deleted from the database`,
                item
            })
        } else {
            res.status(404).json({
                message: "Item not found, nothing was deleted"
            })
        }
    }
}
