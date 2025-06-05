import { query } from 'express';
import connection from './connection.js'

const getCategories = async () => { 
    const [result] = await connection.query(" SELECT * FROM Category")
    if (result.length === 0) {
        return null;
    } else { 
        return result; 
    }
}

const getCategoriesById = async (id) => { 
    const [result] = await connection.query("SELECT * FROM Category WHERE id = ?", [id])
    if (result.length === 0) { 
        return null 
    } else { 
        return result; 
    }
}


const addCategory = async (name, category, price, description, imageBuffer) => { 
    const [result] = await connection.query("INSERT INTO Category (name, category, price, description, image) VALUES (?, ?, ?, ?, ? )", 
        [name, category ,price, description , imageBuffer])
    if (result.affectedRows === 0) { 
        return null; 
    } else { 
        return await getCategoriesById(result.insertId)
    }
}
const updateCategory = async (name, category, price, description, imageBuffer, id) => { 
    const [result] = await connection.query("UPDATE Category SET name = ?, category = ?,  price = ?, description = ?, image = ? WHERE id = ?", 
        [name, category, price, description, imageBuffer, id]
    )
    if (result.affectedRows === 0) { 
        return null; 
    } else { 
        return await getCategoriesById(id)
    }
}


const deleteCategory = async (id) => { 
    const itemBeingDeleted = await getCategoriesById(id)
    const [result] = await connection.query("DELETE FROM Category WHERE id = ?", [id])
    if (result.affectedRows === 0) { 
        return null 
    } else { 
        return itemBeingDeleted; 
    }
}

export default { getCategories, getCategoriesById, addCategory, updateCategory,deleteCategory}