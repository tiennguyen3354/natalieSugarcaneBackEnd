import categoriesDb from './../database/categoriesDb.js'
import chalk from 'chalk'

export const getCategories = async (req, res) => {
  const result = await categoriesDb.getCategories();

  if (result !== null) {
    console.log(chalk.bgMagenta("Users accessing /category"));

    const convertedResult = result.map(item => {
      let imageBase64 = null;

     
      if (item.image && Buffer.isBuffer(item.image)) {
        imageBase64 = item.image.toString('base64');
      }

      return {
        ...item,
        image: imageBase64, 
      };
    });

    res.status(200).json({
      message: "Success",
      result: convertedResult,
    });
  } else {
    res.status(404).json({
      message: "Items not found",
    });
  }
};


export const addCategory = async (req, res) => {
    const { name, category, price, description} = req.body;
    
    const imageBuffer = req.file ? req.file.buffer : null;
   
    const result = await categoriesDb.addCategory(name, category, price, description, imageBuffer)
    if (name === undefined || description === undefined || price === undefined || category === undefined) { 
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
                message: `successfully added the item. `, 
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
        const imageBuffer = req.file ? req.file.buffer : null;
        const { name, category, price, description } = req.body; 
        if (name === undefined|| description === undefined || price === undefined || category === undefined  ) { 
            res.status(400).json({ 
                message: "Bad request, the fields are missing "
            })
        } else { 
            const result = await categoriesDb.updateCategory(name, category, price, description, imageBuffer, id)
            console.log(result)
            if (result === null) { 
            res.status(404).json({ 
                message: "Result not found, nothing was updated"
                })
            }
            else { 
            const updateCategory = result[0]; 
            res.status(200).json({ 
                message: `item with id: ${updateCategory.id} was updated `, 
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
                message: `${deletedItem.name} was deleted `,
                deletedItem
            })
        }
    } 

}

