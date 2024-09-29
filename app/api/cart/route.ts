import { NextResponse } from "next/server";
import {
  fetchCartItems,
  addItemToCart,
  deleteItems,
  updateItemInCart,
} from "@/actions/cart";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get("userid")); // Get user ID from query params
    if (!userId) throw new Error("User ID is required");

    const data = await fetchCartItems();
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: `Failed to fetch cart items: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const data = await addItemToCart(item);
    return new NextResponse(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: `Failed to add item to cart: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) throw new Error("Missing id");
    const data = await deleteItems(Number(id));
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: `Failed to fetch cart items: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) throw new Error("Missing id");

    const updates = await request.json();
    if (
      typeof updates.quantity !== "number" ||
      typeof updates.total !== "number"
    ) {
      throw new Error("Invalid quantity or total");
    }

    const data = await updateItemInCart(
      Number(id),
      updates.quantity,
      updates.total
    );
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: `Failed to update cart item: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
