"use client";

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { urlFor } from "@/sanity/lib/image";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        // Retrieve the cart from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const saveCartToLocalStorage = (updatedCart) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        saveCartToLocalStorage(updatedCart);
        alert("Item removed from cart!");
    };

    const handleItemIncrease = (id) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        saveCartToLocalStorage(updatedCart);
    };

    const handleItemDecrease = (id) => {
        const updatedCart = cartItems
            .map((item) => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter((item) => item.quantity > 0); // Remove items with quantity 0
        saveCartToLocalStorage(updatedCart);
    };

    if (!isLoggedIn) {
        return (
            <div className="w-full h-screen grid place-items-center p-4">
                <p>Please log in to access this page.</p>
            </div>
        );
    }

    return (
        <div className="py-10 bg-gray-50">
            <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl text-center font-semibold text-zinc-800">Cart</h2>
            </div>
            <hr className="my-5" />
            <div className="px-4 md:px-20 space-y-4">
                {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <div
                            className="shadow-md p-2 md:p-4 bg-white flex flex-col md:flex-row"
                            key={product.id}
                        >
                            <div className="w-full md:w-1/2 flex gap-2">
                                <div>
                                    <div className="w-20 aspect-square bg-green-300">
                                        <Image
                                            src={urlFor(product.img).url()}
                                            alt={product.name}
                                            width={1000}
                                            height={1000}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-lg text-zinc-800">
                                        {product.name}
                                    </p>
                                    <p className="font-semibold text-green-900 text-base">
                                        {`₹${product.price}`}
                                    </p>
                                    <p className="font-semibold text-zinc-600 text-base">
                                        QTY: {product.quantity}
                                    </p>
                                </div>
                            </div>
                            <hr className="border-zinc-400 my-2" />
                            <div className="flex items-center justify-between md:w-1/2 ">
                                <div className="flex gap-x-10 items-center ">
                                    <div className="w-8 h-8 bg-zinc-900 text-white grid place-items-center rounded-md cursor-pointer" onClick={() => handleItemDecrease(product.id)}>
                                        <Minus />
                                    </div>
                                    <div className="w-8 h-8 text-green-900 grid place-items-center font-semibold">
                                        {product.quantity}
                                    </div>
                                    <div className="w-8 h-8 bg-zinc-900 text-white grid place-items-center rounded-md cursor-pointer" onClick={() => handleItemIncrease(product.id)}>
                                        <Plus />
                                    </div>
                                </div>
                                <div>
                                    <div className="w-full h-8 px-3 bg-red-700 text-white grid place-items-center rounded-md cursor-pointer" onClick={() => handleRemoveFromCart(product.id)}>
                                        Remove
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-zinc-600">Your cart is empty.</p>
                )}
            </div>
            <hr className="my-5" />
            {cartItems.length > 0 && (
                <div className="flex flex-col gap-y-4 px-4 md:px-20">
                    <div className="text-lg font-semibold">
                        <p>
                            Cart Total:{" "}
                            <span className="text-green-900">
                                ₹
                                {cartItems.reduce(
                                    (total, item) => total + item.price * item.quantity,
                                    0
                                )}
                            </span>
                        </p>
                        {/* <p>
                            Delivery Fee: <span className="text-green-900">₹50</span>
                        </p>
                        <p>
                            Total:{" "}
                            <span className="text-green-900">
                                ₹
                                {cartItems.reduce(
                                    (total, item) => total + item.price * item.quantity,
                                    0
                                ) + 50}
                            </span>
                        </p> */}
                    </div>
                    <button className="py-2 px-3 bg-zinc-900 text-lg text-white font-medium">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
