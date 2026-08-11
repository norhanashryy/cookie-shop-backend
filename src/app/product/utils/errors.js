const AppError = require('../../common/errors/app.error');

const ProductNotFoundError = new AppError('Error. Product not found.', 404, true);

const ProductAlreadyExistsError = new AppError('Product already exists.', 400, true);

const InvalidProductDataError = new AppError('Invalid product data.', 400, true);

module.exports = { ProductNotFoundError, ProductAlreadyExistsError, InvalidProductDataError };