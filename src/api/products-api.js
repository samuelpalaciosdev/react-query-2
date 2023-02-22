const baseUrl = 'http://localhost:3000';

export const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  return data;
};
