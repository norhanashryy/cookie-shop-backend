const prisma = require('../../common/db/prisma');

exports.create = async (product) => {
    return prisma.product.create({
        data: product,
    });
}

exports.findById = async (id) => {
    return prisma.product.findUnique({
        where: {
            id: id
        }
    });
}

exports.findAll = async () => {
    return prisma.product.findMany();
}

exports.update = async (id, product) => {
    return prisma.product.update({
        where: {
            id: id
        },
        data: product
    });
} 

exports.delete = async (id) => {
    return prisma.product.delete({
        where: {
            id: id
        }
    });
}