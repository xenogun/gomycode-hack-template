import { provincesPricesMap } from "../config/provinces-prices.js";
import productModel from "../models/product.js";

// Middleware pour valider la requête de commande
export function validateOrderRequest(req, res, next) {
    const { cart, delivery } = req.body;

    if (!cart || !Array.isArray(cart)) {
        return res.status(400).json({ error: "Panier invalide ou manquant" });
    }

    if (!delivery || !delivery.province) {
        return res.status(400).json({ error: "Détails de livraison invalides ou manquants" });
    }

    next();
}

// Middleware pour valider la province
export function validateProvince(req, res, next) {
    const { delivery } = req.body;

    if (!delivery || !delivery.province) {
        return res.status(400).json({ error: "La province est requise" });
    }

    const provinceDetails = provincesPricesMap.get(delivery.province);
    if (!provinceDetails) {
        return res.status(400).json({ error: `La province ${delivery.province} n'existe pas` });
    }

    req.provinceDetails = provinceDetails; // Attacher les détails de la province
    next();
}

// Middleware pour valider les produits du panier
export async function validateProducts(req, res, next) {
    const { cart } = req.body;

    try {
        const productsIds = cart.map((cartElement) => cartElement.productId);
        const products = await productModel.find({ _id: { $in: productsIds } });

        if (products.length !== cart.length) {
            return res.status(400).json({ error: "Nous n'avons pas pu trouver tous les produits" });
        }

        req.products = products; // Attacher les produits
        next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Middleware pour gérer les erreurs
export function errorHandler(err, req, res, next) {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Erreur interne du serveur";

    res.status(statusCode).json({ error: message });
}
