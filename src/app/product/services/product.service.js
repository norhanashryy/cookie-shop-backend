const productRepo = require('../repositories/product.repository');
const { ProductNotFoundError, ProductAlreadyExistsError, InvalidProductDataError } = require('../utils/errors');

exports.createProduct = async (product) => {
    if (!product.name || product.price == null || product.stock == null) {
        throw InvalidProductDataError;
    }

    const existingProductByName = await productRepo.findByName(product.name);
    if (existingProductByName) {    
        throw ProductAlreadyExistsError;
    }

    return productRepo.create(product);
}

exports.getProductById = async (id) => {
    const product = await productRepo.findById(id);
    if (!product) {
        throw ProductNotFoundError;
    }

    return product;
}

exports.getAllProducts = async () => {
    return productRepo.findAll();
}

exports.updateProduct = async (id, product) => {
    const existingProduct = await productRepo.findById(id);
    if (!existingProduct) {
        throw ProductNotFoundError;
    }

    if (product.name === undefined && product.price === undefined && product.stock === undefined) {
        throw InvalidProductDataError;
    }

    if (product.price !== undefined && product.price < 0) {
        throw InvalidProductDataError;
    }

    if (product.stock !== undefined && product.stock < 0) {
        throw InvalidProductDataError;
    }

    if (product.name !== undefined) {
        const existingProductByName = await productRepo.findByName(product.name);

        if (existingProductByName && existingProductByName.id !== id) {
            throw ProductAlreadyExistsError;
        }
    }
    return productRepo.update(id, product);
}

exports.deleteProduct = async (id) => { 
    const existingProduct = await productRepo.findById(id);
    if (!existingProduct) {
        throw ProductNotFoundError;
    }

    return productRepo.delete(id);
}

exports.getAllActiveProducts = async () => {
    return productRepo.findAllActive();
};