export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return await res.json();
}
