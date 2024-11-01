"use server";

import { cookies } from "next/headers"; // Import cookies from Next.js

export const addToCart = async (
  productId: number,
  quantity: number,
  price: number
) => {
  try {
    const total = quantity * price;

    // Get existing cart from cookies
    const cartCookie = cookies().get("cart")?.value;
    let cart = cartCookie ? JSON.parse(cartCookie) : [];

    // Add new product to cart
    cart.push({
      productid: productId,
      quantity: quantity,
      total: total,
      status: true,
    });

    // Update cookies with the new cart
    cookies().set("cart", JSON.stringify(cart));

    // Return success response
    return {
      success: true,
      cart,
      message: "Product added to cart successfully.",
    };
  } catch (error) {
    // Return error response
    return {
      success: false,
      error: (error as Error).message || "Failed to add product to cart.",
    };
  }
};
