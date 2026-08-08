
import productModel from "../models/productModel.js";
import Product from "../models/productModel.js";


export const homePage = (req, res) => {
    try {
        res.status(200).json({ message: "welcome to the Ecommerce Api"});
    } catch (error) {
        res.status(500).json({message: "internal server error"});
    }
};

//create a product endpoint;

export const createProduct = async (req,res) => {
    try {
        const {productName, price, category, stock, description} = req.body;
        if (!productName || !price || !category) {
            return res
            .status(400).json({message: "Please put in the required field while posting."})
        }
        const productData = await Product.create({
            productName, 
            price, 
            category, 
            stock, 
            description,
        });
        res.status(200).json({
            message:"product created successfully",
            data:productData
        });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        
    }
   
};

//get all product
export const getAllproduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: "products fetched successfully",
            data: products,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//fetching a product by it id
export const getAproduct = async (req, res) => {
    try {
        const {id} = req.params;
        const allproducts = await Product.findById(id);

        if (!allproducts) {
            return res.status(400).json({message: "product not found"})
        };

        res
        .status(200)
        .json({ message: "product fetched successfully", data: allproducts })

    } catch (error) {
        res.status(500).json ({message:error.message});
        console.log(error.message);
        
    }
};

//update a product;
export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {price, stock} = req.body;

        const updatedProducts = {};
        if (stock !== undefined) updatedProducts.stock = stock;
        if (price !== undefined) updatedProducts.price = price;

    const mynewupdatedproduct = await productModel.findByIdAndUpdate(
        id,
        {$set: updatedProducts},
        {returnDocument: "after"},
    );

    if(!mynewupdatedproduct) {
        return res.status(400).json({message: "product not found"});
    }

    res.status(200).json({
        message: "product updated successfully",
        data: mynewupdatedproduct,
    });
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error.message);
        
    }
};

