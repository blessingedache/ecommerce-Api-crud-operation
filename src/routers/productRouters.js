import express from "express";
import { 
    homePage, 
    createProduct, 
    getAllproduct, 
    getAproduct,
    updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/home", homePage);
router.post("/products", createProduct);
router.get("/products", getAllproduct);
router.get("/products/:id", getAproduct);
router.patch("/products/:id", updateProduct);


export default router;