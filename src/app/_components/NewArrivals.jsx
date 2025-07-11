'use client'
import React, { useEffect, useState } from 'react'
// import { products } from '../data'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { client } from '@/sanity/lib/client'

function NewArrivals() {
    const [newProducts, setNewProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
                    _id,
                    name,
                    discountedPrice,
                    originalPrice,
                    stock,
                    "imageUrl": image.asset->url
                }`
                const products = await client.fetch(query)
                setNewProducts(products)
            } catch (error) {
                console.error("Failed to fetch products:", error)
            }
        }
        fetchProducts()
    }, [])

    console.log(newProducts)

    return (
        <div className='my-10'>
            <div className='flex items-center justify-center gap-3 mb-14'>
                <p className='w-10 bg-orange-600 h-1'></p>
                <h2 className='text-3xl text-center font-semibold text-zinc-800'>New Arrivals</h2>
                <p className='w-10 bg-orange-600 h-1'></p>
            </div>
            <div className='px-4 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6'>
                {
                    newProducts.map((product) => (
                        <ProductCard key={product._id} id={product._id} img={product.imageUrl} name={product.name} originalPrice={product.originalPrice} discountedPrice={product.discountedPrice} stock={product.stock} />
                    ))
                }

            </div>
            <div className='flex justify-center mt-10'>
                <Link href={'/shop'} className='py-1 px-6 text-white border border-zinc-900 bg-zinc-900 transition-colors ease-in-out duration-300 hover:text-orange-600 hover:bg-white hover:border-orange-600'>See More</Link>
            </div>
        </div>
    )
}

export default NewArrivals