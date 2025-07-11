"use client"
import React, { useEffect, useState } from 'react'
// import { products } from '../data'
import ProductCard from '../_components/ProductCard'
import { client } from '@/sanity/lib/client'
function Shop() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = `*[_type == "product"]{
                    _id,
                    name,
                    discountedPrice,
                    originalPrice,
                    stock,
                    "imageUrl": image.asset->url
                }`;
                const result = await client.fetch(query);
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    console.log(products)

    return (
        <div className=' py-10'>
            <div className='flex items-center justify-center gap-3 mb-14'>
                <p className='w-10 bg-orange-600 h-1'></p>
                <h2 className='text-3xl text-center font-semibold text-zinc-800'>All Products</h2>
                <p className='w-10 bg-orange-600 h-1'></p>
            </div>
            <div className='px-4 lg:px-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    products.map((product) => (
                        <ProductCard key={product._id} id={product._id} img={product.imageUrl} name={product.name} originalPrice={product.originalPrice} discountedPrice={product.discountedPrice} stock={product.stock} />
                    ))
                }

            </div>
        </div>
    )
}

export default Shop