const productService = require('../services/product.service');

exports.createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).json({message: 'Product successfully created!', product});
    } catch (error) {
        next(error);
    }
}

exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        return res.status(200).json({message: 'Product successfully updated!', product});
    } catch(error) {
        next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        return res.status(200).json({message: 'Product successfully deleted!'});
    } catch (error) {
        next(error);
    }
}