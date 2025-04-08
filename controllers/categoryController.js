import categoriesDb from './../database/categoriesDb.js'
import chalk from 'chalk'
import express from 'express'
export const getCategories = async (req, res) => { 
    const result = await categoriesDb.getCategories(); 
    
    if (result !== null) { 
        console.log(chalk.bgMagenta( "Users accessing /category" ) )
        res.status(200).json({
            message: "Success", 
            result
        })
    } else {  
        res.status(404).json({ 
            message: "Items not found"
        })
    }
}

export const addCategory = async (req, res) => {
    const {category_name, category_description} = req.body
    const result = await categoriesDb.addCategory(category_name, category_description)
    if (category_name === undefined || category_description === undefined) { 
        res.status(400).json({ 
            message: "Bad request, the fields are missing"
        })
    } else { 
        if (result === null) { 
            res.status(404).json({ 
                message: "Server error, can not add category."
            })
        } else { 
            const category = result[0]; 
            res.status(201).json({ 
                message: `${category.category_name} was added with id: ${category.category_id}`, 
                category
            })
        }
    }
 
}

export const updateCategory = async (req, res) => {
    const id = parseInt(req.params.id)
    
    if (!Number.isInteger(id)) { 
        res.status(400).json({
            message: "Bad request, the id needs to be a number "
        })
    } else { 
        const { category_name, category_description } = req.body; 
        if (category_name === undefined|| category_description === undefined ) { 
            res.status(400).json({ 
                message: "Bad request, the fields are missing "
            })
        } else { 
            const result = await categoriesDb.updateCategory(category_name, category_description, id)
        if (result === null) { 
            res.status(404).json({ 
                message: "Result not found, nothing was updated"
            })
        }
        else { 
            const updateCategory = result[0]; 
            res.status(200).json({ 
                message: `item with id: ${updateCategory.category_id} was updated `, 
                updateCategory 
            })
        }
        }
        
    }
}

export const deleteCategory = async (req, res) => { 
    const id = parseInt(req.params.id); 
    if (!Number.isInteger(id)) {
        res.status(400).json({
            message: "Bad request, the id needs to be a number "
        })
    } else {
        const result = await categoriesDb.deleteCategory(id);
        if (result === null) {
            res.status(404).json({
                message: "The category is not found "
            })
        } else {
            const deletedItem = result[0];
            res.status(200).json({
                message: `${deletedItem.category_name} was deleted `,
                deletedItem
            })
        }
    } 

}

