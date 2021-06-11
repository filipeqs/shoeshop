const products = [
    {
        name: 'Adidas 1',
        image: '/images/adidas-1.jpg',
        description: 'Adidas Shoes 1',
        brand: 'Adidas',
        price: 89.99,
        stock: [
            {
                size: 8,
                count: 6,
            },
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Adidas 2',
        image: '/images/adidas-2.jpg',
        description: 'Adidas Shoes 2',
        brand: 'Adidas',
        price: 89.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 5,
        numReviews: 6,
    },
    {
        name: 'Adidas 3',
        image: '/images/adidas-3.jpg',
        description: 'Adidas Shoes 3',
        brand: 'Adidas',
        price: 89.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 3,
        numReviews: 12,
    },
    {
        name: 'Adidas 4',
        image: '/images/adidas-4.jpg',
        description: 'Adidas Shoes 4',
        brand: 'Adidas',
        price: 89.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 3.5,
        numReviews: 12,
    },
    {
        name: 'All Star 1',
        image: '/images/all-star-1.jpg',
        description: 'All Star Shoes 1',
        brand: 'all-star',
        price: 99.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'All Star 2',
        image: '/images/all-star-2.jpg',
        description: 'All Star Shoes 2',
        brand: 'all-star',
        price: 99.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'All Star 3',
        image: '/images/all-star-3.jpg',
        description: 'All Star Shoes 3',
        brand: 'all-star',
        price: 99.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Asics 1',
        image: '/images/asics-1.jpg',
        description: 'Asics Shoes 1',
        brand: 'asics',
        price: 99.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Fila 1',
        image: '/images/fila-1.jpg',
        description: 'Fila Shoes 1',
        brand: 'fila',
        price: 69.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'New Balance 1',
        image: '/images/new-balance-1.jpg',
        description: 'New Balance Shoes 1',
        brand: 'new-balance',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'New Balance 2',
        image: '/images/new-balance-2.jpg',
        description: 'New Balance Shoes 2',
        brand: 'new-balance',
        price: 99.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'New Balance 3',
        image: '/images/new-balance-3.jpg',
        description: 'New Balance Shoes 3',
        brand: 'new-balance',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'New Balance 4',
        image: '/images/new-balance-4.jpg',
        description: 'New Balance Shoes 4',
        brand: 'new-balance',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'New Balance 5',
        image: '/images/new-balance-5.jpg',
        description: 'New Balance Shoes 5',
        brand: 'new-balance',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 1',
        image: '/images/nike-1.jpg',
        description: 'Nike Shoes 1',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 2',
        image: '/images/nike-2.jpg',
        description: 'Nike Shoes 2',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 3',
        image: '/images/nike-3.jpg',
        description: 'Nike Shoes 3',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 4',
        image: '/images/nike-4.jpg',
        description: 'Nike Shoes 4',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 5',
        image: '/images/nike-5.jpg',
        description: 'Nike Shoes 5',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 6',
        image: '/images/nike-6.jpg',
        description: 'Nike Shoes 6',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 7',
        image: '/images/nike-7.jpg',
        description: 'Nike Shoes 7',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 8',
        image: '/images/nike-8.jpg',
        description: 'Nike Shoes 8',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 9',
        image: '/images/nike-9.jpg',
        description: 'Nike Shoes 9',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 10',
        image: '/images/nike-10.jpg',
        description: 'Nike Shoes 10',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 11',
        image: '/images/nike-11.jpg',
        description: 'Nike Shoes 11',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 12',
        image: '/images/nike-12.jpg',
        description: 'Nike Shoes 12',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Nike 13',
        image: '/images/nike-13.jpg',
        description: 'Nike Shoes 13',
        brand: 'nike',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Puma 1',
        image: '/images/puma-1.jpg',
        description: 'Puma Shoes 1',
        brand: 'puma',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Puma 2',
        image: '/images/puma-2.jpg',
        description: 'Puma Shoes 2',
        brand: 'puma',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Puma 3',
        image: '/images/puma-3.jpg',
        description: 'Puma Shoes 3',
        brand: 'puma',
        price: 79.99,
        stock: [
            {
                size: 9,
                count: 5,
            },
            {
                size: 10,
                count: 10,
            },
        ],
        rating: 4.5,
        numReviews: 12,
    },
];

module.exports = products;
