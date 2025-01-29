"use client"
import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';
function ProductCard({ id, img, name, discountedPrice = 100, originalPrice = 200 }) {
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItemIndex = cart.findIndex((item) => item.id === id);

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
                <p className='font-semibold text-base line-clamp-1'>{name}</p>
                <span className='text-orange-600 font-semibold text-lg'><span className='text-gray-500 text-sm line-through'>{`₹${originalPrice}`}</span> {`₹${discountedPrice}`}</span>
                <button className='w-full py-1 text-white border border-zinc-900 bg-zinc-900 transition-colors ease-in-out duration-300 hover:text-orange-600 hover:bg-white hover:border-orange-600' onClick={handleAddToCart}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default ProductCard