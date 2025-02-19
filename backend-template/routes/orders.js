import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/order.js";
import { validateOrderRequest, validateProducts, validateProvince } from "../middlewares/order.js";
import { careateOrderSchema } from "../validation/orderValidation.js"; 
const orderRouter = Router();

orderRouter
    .route("/")
    .post(createOrder, validateOrderRequest, validateProvince, validateProducts, createOrder)
    .get(getMyOrders);

export default orderRouter;
