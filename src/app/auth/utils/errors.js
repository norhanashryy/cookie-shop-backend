const AppError = require('../../common/errors/app.error');

const UserAlreadyExistsError =  new AppError('This email has an existing account!', 400, true);

const InvalidCredentialsError =  new AppError('Invalid email or password.', 401, true);

const UnauthorizedError =  new AppError('Unauthorized.', 401, true);

module.exports = { UserAlreadyExistsError, InvalidCredentialsError, UnauthorizedError };