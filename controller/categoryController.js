const Category = require('../model/Category');

exports.createCategory = async (req, res) => {
    const {name, description} = req.body;
    try {
        const category = await Category.findOne({ name: name });

        if (category) return res.status(400).send("Category already exist");

        const newcategory = new Category ({
            name,
            description
        });

        await newcategory.save()

        res.status(201).json({
            status: "success",
            message: "Category created successfully",
            data: newcategory
        })
    } catch (error) {
        res.status(500).json ({
            status : "failed",
            message: error.message,
        });
    };
};


exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findById(categoryId);

        if (!categoryId) {
            return res.status(400).json({
                status: false,
                message: "Category do not exist"
            });
        };

        res.status(201).json({
            status: "success",
            message: "Category fetched successfully",
            data: category
        })
    }catch (error) {
        res.status(500).json({
            statu: "success",
            message: error.message
        });
    };
};


exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.find();
        if(category.length === 0){
            return res.status(400).send("No category found")
        };

        res.status(201).json({
            status: "success",
            message: "All the Categories fetched successfully",
            data: category
        })
    }catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}


exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    try{
        const category = await Category.findByIdAndUpdate(
            categoryId,
            { $set : req.body},
            { new : true})
        if(!category) return res.status(400).send("Category Update unsuccessfull");

        res.status(200).json({
            status: "success",
            message: "Category Updated Succesfully",
            data: category
        })

    } catch(error) {
        res.status.json({
            status: "failed",
            message: error.message
        })
    }
}


exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try{
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(400).json({
                status: false,
                message: "Category not found"
            });
        };

        res.status(201).json({
            status: "success",
            message: "Category deleted successfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}