import { Router } from "express";
import {
    getProducts,
    updateProduct,
    deleteProduct,
    createProduct,
    getProduct,
} from "../controllers/product.js";
import {
    validateProductData,
    validateProductExists,
    validateSearchAndSortParams,
} from "../middlewares/product.js";
const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/products", validateSearchAndSortParams);

productRouter.post("/products", validateProductData, createProduct);

productRouter.put(
    "/products/:productId",
    validateProductExists,
    validateProductData,
    updateProduct
);

productRouter.get("/products/:productId", validateProductExists, getProduct);

productRouter.delete("/products/:productId", validateProductExists, deleteProduct);

export default productRouter;
