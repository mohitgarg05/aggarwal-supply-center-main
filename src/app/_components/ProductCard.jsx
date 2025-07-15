"use client"
import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';
function ProductCard({ id, img, name, discountedPrice = 100, originalPrice = 200, stock = 0 }) {
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex((item) => item.id === id);
        let currentQuantity = 0;
        if (existingItemIndex !== -1) {
            currentQuantity = cart[existingItemIndex].quantity;
        }
        if (currentQuantity >= stock) {
            alert('Cannot add more than available stock!');
            return;
        }
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ id, name, price: discountedPrice, img, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
    };
    return (
        <div className='w-full p-2 shadow-xl'>
            <div className='aspect-square w-full bg-green-200 border border-orange-600'>
                <Image src={urlFor(img).url()} alt={name} width={1000} height={1000} className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col mt-2 text-zinc-800'>
                <p className='font-semibold text-base'>{name}</p>
                <span className='text-orange-600 font-semibold text-lg'><span className='text-gray-500 text-sm line-through'>{`₹${originalPrice}`}</span> {`₹${discountedPrice}`}</span>
                {/* <span className={`text-sm font-medium ${stock === 0 ? 'text-red-600' : 'text-green-700'}`}>{stock === 0 ? 'Out of Stock' : `In Stock: ${stock}`}</span> */}
                <button
                    className='w-full py-1 text-white border border-zinc-900 bg-zinc-900 transition-colors ease-in-out duration-300 hover:text-orange-600 hover:bg-white hover:border-orange-600 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed'
                    onClick={handleAddToCart}
                    // disabled={stock === 0}
                >
                    {/* {stock === 0 ? 'Out of Stock' : 'ADD TO CART'} */}
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}

export default ProductCard