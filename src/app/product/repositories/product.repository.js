const prisma = require('../../common/db/prisma');

exports.create = async (product) => {
    return prisma.product.create({
        data: product,
    });
}

exports.findById = async (id) => {
    return prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });
};

exports.findByName = async (name) => {
    return prisma.product.findUnique({
        where: {
            name: name
        }
    });
}   

exports.findAll = async () => {
    return prisma.product.findMany();
}

exports.update = async (id, product) => {
    return prisma.product.update({
        where: {
            id: Number(id)
        },
        data: product
    });
};

exports.delete = async (id) => {
    return prisma.product.delete({
        where: {
            id: Number(id)
        }
    });
};

exports.findAllActive = async () => {
    return prisma.product.findMany({
        where: {
            isActive: true
        }
    });
};