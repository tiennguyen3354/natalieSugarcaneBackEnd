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
    const [result] = await connection.query("SELECT * FROM Category WHERE category_id = ?", [id])
    if (result.length === 0) { 
        return null 
    } else { 
        return result; 
    }
}


const addCategory = async (category_name, category_description) => { 
    const [result] = await connection.query("INSERT INTO Category (category_name, category_description) VALUES (?, ?)", 
        [category_name, category_description])
    if (result.affectedRows === 0) { 
        return null; 
    } else { 
        return await getCategoriesById(result.insertId)
    }
}
const updateCategory = async (category_name, category_description, id) => { 
    const [result] = await connection.query("UPDATE Category SET category_name = ?, category_description = ? WHERE category_id = ?", 
        [category_name, category_description, id]
    )
    if (result.affectedRows === 0) { 
        return null; 
    } else { 

        return await getCategoriesById(id)
    }
}


const deleteCategory = async (id) => { 
    const itemBeingDeleted = await getCategoriesById(id)
    const [result] = await connection.query("DELETE FROM Category WHERE category_id = ?", [id])
    if (result.affectedRows === 0) { 
        return null 
    } else { 
        return itemBeingDeleted; 
    }
}

export default { getCategories, getCategoriesById, addCategory, updateCategory,deleteCategory}