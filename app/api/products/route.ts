// app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/fakeStore";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Error en /api/products", err);
    return NextResponse.json({ error: "Unable to fetch products" }, { status: 500 });
  }
}