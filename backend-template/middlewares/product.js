import productModel from "../models/product.js";

// Middleware pour valider la création ou la mise à jour d'un produit
export function validateProductData(req, res, next) {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res
            .status(400)
            .json({ error: "Tous les champs (nom, prix, description) sont requis" });
    }

    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ error: "Le prix doit être un nombre positif" });
    }

    next();
}

// Middleware pour vérifier si un produit existe
export async function validateProductExists(req, res, next) {
    const productId = req.params.productId;

    try {
        const product = await productModel.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }

        req.product = product; // Attacher le produit à l'objet `req` pour une utilisation ultérieure
        next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Middleware pour valider les paramètres de recherche et de tri
export function validateSearchAndSortParams(req, res, next) {
    const { sorting, sortingDirection } = req.query;

    if (sorting && !["name", "price", "createdAt"].includes(sorting)) {
        return res
            .status(400)
            .json({ error: "Le tri doit être effectué par 'name', 'price' ou 'createdAt'" });
    }

    if (sortingDirection && !["asc", "desc"].includes(sortingDirection)) {
        return res.status(400).json({ error: "La direction du tri doit être 'asc' ou 'desc'" });
    }

    next();
}

// Middleware pour gérer les erreurs
export function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log l'erreur pour le débogage

    const statusCode = err.statusCode || 500;
    const message = err.message || "Erreur interne du serveur";

    res.status(statusCode).json({ error: message });
}
